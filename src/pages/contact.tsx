import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {fetcher} from '../utils/fetcher';
import {HeadTag} from '../components/head-tag';
import {DISCORD_ID} from '../components/activity';
import {useLanyard, type Data} from 'use-lanyard';
import {ListItemReversed} from '../components/list-item';
import {FaDiscord, FaEnvelope, FaKeybase, FaPaperPlane, FaTwitter} from 'react-icons/fa';

const statusMap: Record<Data['discord_status'], string> = {
  online: 'bg-emerald-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
  offline: 'bg-neutral-500',
};

export default function Contact() {
  const router = useRouter();
  const {data: lanyard} = useLanyard(DISCORD_ID);

  return (
    <>
      <HeadTag title="Contact Me" />

      <div className="space-y-4">
        <h1 className="text-2xl font-bold sm:text-3xl">Let's talk 💬</h1>
        <p className="pb-4">
          If you have any questions, feel free to contact me. I am always open to discussing new
          projects and proposals.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <form
              className="space-y-2"
              action="/api/form"
              method="POST"
              onSubmit={async event => {
                event.preventDefault();

                const values = Object.fromEntries(
                  new FormData(event.target as HTMLFormElement).entries(),
                );

                const promise = fetcher('/api/contact', {
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(values),
                  method: 'POST',
                });

                await toast
                  .promise(promise, {
                    success: 'Success!',
                    loading: 'Sending...',
                    error: (error: Error) => error?.message ?? 'Something went wrong...',
                  })
                  .then(async () => router.push('/thanks'))
                  .catch(() => null);
              }}
            >
              <label htmlFor="name" className="block mb-4">
                <span className="select-none text-sm font-bold uppercase tracking-wide text-opacity-50 dark:text-white">
                  Your Name
                </span>

                <input
                  required
                  type="name"
                  name="name"
                  id="name"
                  className="block w-full mt-2 rounded-md bg-neutral-200/50 py-2 px-3 leading-none font-sans text-lg focus:outline-none focus:ring dark:bg-white/5"
                />
              </label>

              <label htmlFor="email" className="block mb-4">
                <span className="select-none text-sm font-bold uppercase tracking-wide text-opacity-50 dark:text-white">
                  Email Address
                </span>

                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full mt-2 rounded-md bg-neutral-200/50 py-2 px-3 leading-none font-sans text-lg focus:outline-none focus:ring dark:bg-white/5"
                />
              </label>

              <label htmlFor="body" className="block mb-4">
                <span className="select-none text-sm font-bold uppercase tracking-wide text-opacity-50 dark:text-white">
                  Your message
                </span>

                <textarea
                  rows={5}
                  name="body"
                  minLength={10}
                  id="body"
                  className="block w-full mt-2 resize-none rounded-md bg-neutral-200/50 py-2 px-3 leading-none font-sans text-lg focus:outline-none focus:ring dark:bg-white/5"
                />
              </label>

              <div className="block pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 rounded-full bg-emerald-700 py-2 px-8 text-lg text-emerald-100 focus:outline-none focus:ring dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  <span>Send</span> <FaPaperPlane />
                </button>
              </div>
            </form>
          </div>

          <div>
            <ul className="list-inside list-disc space-y-2 pt-5 md:float-right">
              <ListItemReversed
                icon={FaDiscord}
                text={
                  lanyard ? (
                    <span className="flex items-center space-x-1">
                      <span
                        className={`${
                          statusMap[lanyard.discord_status]
                        } inline-block h-2 w-2 rounded-full`}
                      />

                      <span>
                        {lanyard.discord_user.username}#{lanyard.discord_user.discriminator}
                      </span>
                    </span>
                  ) : null
                }
              />
              <ListItemReversed icon={FaKeybase} text={lanyard?.kv.keybase ?? ''} />
              <ListItemReversed icon={FaTwitter} text={'@' + lanyard?.kv.twitter ?? ''} />
              <ListItemReversed icon={FaEnvelope} text={lanyard?.kv.email} />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
