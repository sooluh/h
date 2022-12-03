import {useReducer} from 'react';
import type {PinnedRepo} from '../hooks/github';
import {AnimatePresence, motion} from 'framer-motion';

export function ProjectCard({repo: project}: {repo: PinnedRepo}) {
  const [isOpen, toggle] = useReducer(x => !x, false);

  return (
    <motion.div
      animate={{height: isOpen ? 'auto' : '60px'}}
      className="relative flex flex-col overflow-hidden rounded-md border-white/10 bg-gradient-to-tr from-blue-100 to-blue-700/5 text-blue-900/80 no-underline dark:border dark:from-white/5 dark:to-white/5 dark:text-neutral-100 dark:hover:bg-white/10 md:rounded-lg"
    >
      <button
        type="button"
        className="flex cursor-pointer select-none items-center space-x-2 border-b border-white/10 px-5 text-lg font-bold focus:outline-none"
        onClick={toggle}
      >
        <div className="flex flex-1 items-center space-x-2 text-left">
          <span className="my-auto py-5 leading-none">{project.repo}</span>

          <span className="flex items-center space-x-3 text-xs">
            <span className="space-x-1">
              <span>⭐</span>
              <span>{project.stars}</span>
            </span>

            <span className="space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span>{project.forks}</span>
            </span>
          </span>
        </div>
        <div>
          <motion.div
            className="rounded-full bg-white/0 p-1 hover:bg-white/10"
            animate={{rotate: isOpen ? 90 : 0}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="flex h-full"
          >
            <div className="flex flex-col space-y-4 py-4 px-5">
              <p className="flex-1">{project.description}</p>

              <div>
                <a
                  href={`https://github.com/${project.owner}/${project.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex select-none items-center space-x-2 rounded-full bg-blue-700 py-2 px-6 text-white no-underline transition-transform duration-500 hover:scale-95 dark:bg-white/10"
                >
                  <span>View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
