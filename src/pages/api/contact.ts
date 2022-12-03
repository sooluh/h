import {z} from 'zod';
import {api} from '../../server/api';
import {DISCORD_WEBHOOK} from '../../server/constants';

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
        content: 'Pesan baru dari website utama',
        embeds: [
          {
            description: body.body,
            author: {
              name: body.name,
            },
            fields: [
              {
                name: 'Email Address',
                value: body.email,
              },
              {
                name: 'IP Address',
                value:
                  req.headers['x-forwarded-for'] ?? req.connection.remoteAddress ?? 'unknown!?',
              },
            ],
          },
        ],
      }),
    });

    if (result.status >= 400) {
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
