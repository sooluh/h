import 'nprogress/nprogress.css';
import 'react-tippy/dist/tippy.css';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import '../../public/fonts/general-sans/css/general-sans.css';

import Head from 'next/head';
import {SWRConfig} from 'swr';
import NProgress from 'nprogress';
import {Router} from 'next/router';
import type {AppProps} from 'next/app';
import {fetcher} from '../utils/fetcher';
import {Toaster} from 'react-hot-toast';
import {loadCursor} from '../utils/cursor';
import {NavLink} from '../components/nav-link';
import {Activity} from '../components/activity';
import {Squash as Hamburger} from 'hamburger-react';
import type {Data as LanyardData} from 'use-lanyard';
import {AnimatePresence, motion} from 'framer-motion';
import {StrictMode, useEffect, useRef, useState} from 'react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type PageProps = {
  title?: string;
  lanyard?: LanyardData;
  pinnedRepos?: unknown;
};

export default function App({Component, pageProps, router}: AppProps<PageProps>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const ballCanvas = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setMobileMenuOpen(old => !old);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'unset';
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined' || !ballCanvas.current) {
      return;
    }

    return loadCursor(ballCanvas.current);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setMobileMenuOpen(false);

    void new Audio('/pop.mp3').play().catch(() => null);
  }, [router.pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const listener = () => {
      setHasScrolled(window.scrollY > 20);
    };

    document.addEventListener('scroll', listener);

    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <NavLink href="/" closeMenu={closeMenu}>
        /
      </NavLink>
      <NavLink href="/about" closeMenu={closeMenu}>
        /about
      </NavLink>
      <NavLink href="/contact" closeMenu={closeMenu}>
        /contact
      </NavLink>
    </>
  );

  return (
    <StrictMode>
      <SWRConfig
        value={{
          fallback: {
            'https://gh-pinned.nxl.sh/api/user/sooluh': pageProps?.pinnedRepos,
          },
          fetcher,
        }}
      >
        <Toaster toastOptions={{position: 'top-left'}} />

        <Head>
          <title>Suluh Sulistiawan</title>
        </Head>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0}}
              className="fixed inset-0 z-10 space-y-2 bg-white py-24 px-8 dark:bg-neutral-900 sm:hidden"
            >
              <h1 className="text-4xl font-bold">Menu.</h1>

              <ul className="grid grid-cols-1 gap-2">{navLinks}</ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="sticky top-0 z-20 h-32 overflow-hidden transition-all sm:hidden">
          <div
            className={`${
              hasScrolled || mobileMenuOpen ? 'mt-0' : 'mx-5 mt-10'
            } relative bg-neutral-100 transition-all dark:bg-neutral-900 ${
              hasScrolled || mobileMenuOpen ? 'rounded-none' : 'rounded-lg'
            }`}
          >
            <div
              className={`flex justify-between space-x-2 pr-5 transition-colors ${
                mobileMenuOpen ? 'bg-neutral-100 dark:bg-neutral-800' : 'bg-transparent'
              }`}
            >
              <button
                type="button"
                className="relative z-50 block px-2 text-neutral-500 transition-all focus:ring"
                onClick={toggleMenu}
              >
                <Hamburger toggled={mobileMenuOpen} size={20} color="currentColor" />
              </button>

              <div className="overflow-hidden py-2 px-1">
                <Activity />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl py-10 px-5">
          <div className="hidden items-center space-x-2 sm:flex">
            <nav className="flex-1">
              <ul className="flex space-x-4">{navLinks}</ul>
            </nav>

            <div className="overflow-hidden py-2 px-1">
              <Activity />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={router.asPath}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
              <main className="mx-auto max-w-3xl space-y-12 md:py-24">
                <Component {...pageProps} />
              </main>

              <footer className="mx-auto mt-20 md:mt-0 max-w-3xl border-t-2 border-neutral-900/10 p-4 py-10 opacity-50 dark:border-white/10">
                <h1 className="text-3xl font-bold">Suluh Sulistiawan</h1>
                <p>Full-Stack Developer • {new Date().getFullYear()}</p>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          ref={ballCanvas}
          className="ball-transitions pointer-events-none fixed z-30 h-6 w-6 rounded-full border border-black bg-transparent opacity-0 shadow-md duration-200 dark:border-white"
        />
      </SWRConfig>
    </StrictMode>
  );
}
