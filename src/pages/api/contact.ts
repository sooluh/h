import {z} from 'zod';
import {api} from '../../server/api';
import {DISCORD_ID, DISCORD_WEBHOOK} from '../../server/constants';

const schema = z.object({
  name: z.string().trim(),
  email: z.string().email(),
  body: z.string().max(500).min(10).trim(),
});

export default api({
  async POST({req, res}) {
    const body = schema.parse(req.body);

    const result = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content: `Hey <@!${DISCORD_ID}>, there's a new message from the contact page!`,
        embeds: [
          {
            title: 'Respond This?',
            url: `https://mailto.suluh.my.id/${body.email}`,
            fields: [
              {
                name: 'Email',
                value: body.email,
              },
              {
                name: 'Message',
                value: body.body,
              },
              {
                name: 'IP Address',
                value:
                  req.headers['x-forwarded-for'] ?? req.connection.remoteAddress ?? 'unknown!?',
              },
            ],
            author: {
              name: body.name,
              icon_url: `https://avatars.dicebear.com/api/miniavs/${encodeURI(body.name)}.png`,
            },
          },
        ],
      }),
    });

    if (result.status >= 400) {
      console.log(result);
      res.throw(result.status, 'Error sending notification');
    }

    if (req.headers['content-type'] === 'application/json') {
      return {
        sent: true,
      };
    }

    return {
      _redirect: '/thanks',
    };
  },
});
