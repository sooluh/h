import dayjs from 'dayjs';
import Link from 'next/link';
import Image from 'next/image';
import Banner from '../../public/banner.jpg';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="block text-3xl font-bold sm:text-4xl md:text-6xl">Who am I? 🤔</h1>

      <div className="space-y-4">
        <p>Bismillah, let's try to get to know me further!</p>
      </div>

      <div className="text-neutral-900/30 transition-all hover:text-neutral-900 dark:text-white/20 dark:hover:text-white/100 lg:-mx-8">
        <Image
          alt="My photo at Bukit Gambangan"
          src={Banner}
          width={1000}
          height={400}
          placeholder="blur"
          className="block rounded-xl object-cover shadow-xl shadow-neutral-300 dark:shadow-none"
        />
        <span className="sr-only text-sm">My photo at Bukit Gambangan</span>
      </div>

      <div className="space-y-4">
        <p>
          I'm a Muslim software engineer now {new Date().getFullYear() - 2004} years old and based
          in Indonesia, I'm highly specialized in web development (full stack) and a bit of mobile
          development. Currently I am studying Informatics Engineering at{' '}
          <a href="https://stt-wastukancana.ac.id" target="_blank" rel="noreferrer">
            STT Wastukancana
          </a>
          , while also working at{' '}
          <a href="https://pratama.tech" target="_blank" rel="noreferrer">
            PT. Pratama Solusi Teknologi
          </a>{' '}
          as Head of Software Engineer.
        </p>

        <p>
          Alhamdulillah, currently I use various technologies to facilitate the development process,
          when working on clients that I often use is PHP both native and the CodeIgniter 4
          framework, JavaScript using Express.js or Fastify and TypeScript with the AdonisJS
          framework. For databases, I am most experienced in MySQL, the rest I have used MongoDB,
          SQLite3 and RethinkDB.
        </p>

        <p>
          I'm also very interested in linux server configuration, it's a little difficult with web
          server configuration like Nginx or Apache but it's challenging for me. I recently learned
          Python for a Numerical Methods course in college and I'm pretty happy with it so far.
        </p>

        <p>
          Regarding the device I use, I use Windows 11 with WSL2 which is a must for me because I
          mostly use the CLI and of course use Linux, I usually use Ubuntu both on my local machine
          and the servers that I use.
        </p>

        <p>
          Apart from programming, I also like to read books on self-development, Islamic motivation,
          and so on, including story books/history of past pious people, and of course what I have
          to read every day, the Qur'an. But maybe you regret me, because I don't really like
          watching movies and listening to music, at least about music I listen to religious music
          such as prayers or praises to the Prophet Muhammad SAW.
        </p>

        <p>
          If you want to connect more with me, I have several social media that you can check out on
          my <Link href="/contact">/contact</Link> page.
        </p>
      </div>
    </div>
  );
}
