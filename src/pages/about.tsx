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
          Alhamdulillah, at this time I use various technologies to facilitate the development
          process, when working on clients, what I often use are PHP, JavaScript and TypeScript. For
          databases, I am most experienced in MySQL, the rest I have used MongoDB, SQLite3 and
          PostgreSQL.
        </p>

        <p>
          I'm also very interested in linux server configurations especially for (primitive) web
          servers, I'm just learning Python for Numerical Methods and so far I'm quite liking it.
        </p>

        <p>
          Apart from programming, I also like to read books on self-development, Islamic motivation,
          and so on, including story books/history of former pious people. However, I don't really
          like watching movies and listening to music, at least about music, I listen to religious
          music such as prayers or praises to the Prophet Muhammad SAW.
        </p>

        <p>
          You can connect with me via the <Link href="/contact">/contact</Link> page.
        </p>
      </div>
    </div>
  );
}
