import dayjs from 'dayjs';
import {age} from '../utils/time';
import {FaKeybase} from 'react-icons/fa';
import type {GetStaticProps} from 'next';
import type {PinnedRepo} from '../hooks/github';
import {ListItem} from '../components/list-item';
import {DISCORD_ID} from '../components/activity';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useGitHubPinnedRepos} from '../hooks/github';
import {LanyardError, useLanyard} from 'use-lanyard';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import {ProjectCard} from '../components/project-card';
import type {Data as LanyardData, LanyardResponse} from 'use-lanyard';
import {
  SiAdonisjs,
  SiCloudflare,
  SiCodeigniter,
  SiComposer,
  SiDocker,
  SiExpress,
  SiFastify,
  SiGit,
  SiGithub,
  SiGnubash,
  SiJavascript,
  SiJquery,
  SiMysql,
  SiNginx,
  SiNodedotjs as SiNodeDotJs,
  SiPhp,
  SiRedis,
  SiSupabase,
  SiTwitter,
  SiTypescript,
  SiVercel,
  SiWakatime,
  SiYarn,
} from 'react-icons/si';

dayjs.extend(relativeTime);

type Props = {
  pinnedRepos: PinnedRepo[];
  lanyard: LanyardData;
};

export default function Index(props: Props) {
  const {data: projects = props.pinnedRepos} = useGitHubPinnedRepos('sooluh');
  const {data: lanyard} = useLanyard(DISCORD_ID, {initialData: props.lanyard});

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          {lanyard?.kv.github && (
            <a
              href={'https://github.com/' + lanyard.kv.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
            >
              <SiGithub className="h-7 w-7" />
              <span className="sr-only">GitHub Profile</span>
            </a>
          )}

          {lanyard?.kv.twitter && (
            <a
              href={'https://twitter.com/' + lanyard.kv.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter Profile"
            >
              <SiTwitter className="h-7 w-7" />
              <span className="sr-only">Twitter Profile</span>
            </a>
          )}

          {lanyard?.kv.wakatime && (
            <a
              href={'https://wakatime.com/' + lanyard.kv.wakatime}
              target="_blank"
              rel="noreferrer"
              aria-label="WakaTime Profile"
            >
              <SiWakatime className="h-7 w-7" />
              <span className="sr-only">WakaTime Profile</span>
            </a>
          )}

          {lanyard?.kv.keybase && (
            <a
              href={'https://keybase.io/' + lanyard.kv.keybase}
              target="_blank"
              rel="noreferrer"
              aria-label="Keybase Profile"
            >
              <FaKeybase className="h-7 w-7" />
              <span className="sr-only">Keybase Profile</span>
            </a>
          )}

          {lanyard?.kv.location && (
            <p className="inline-flex items-center space-x-2">
              <a
                target="_blank"
                href={`https://www.google.com/maps/search/${lanyard.kv.location}`}
                rel="noreferrer"
                className="flex items-center rounded-full bg-neutral-200 px-2 pr-3 text-neutral-600 no-underline transition-colors dark:bg-neutral-700 dark:text-white dark:text-opacity-50 dark:hover:bg-neutral-800"
              >
                <span className="flex items-center">
                  <HiOutlineLocationMarker className="inline dark:text-white" />
                  &nbsp;
                </span>

                <span className="leading-none">
                  {lanyard.kv.location}
                  &nbsp;
                </span>

                <span className="ml-1 block h-[6px] w-[6px] animate-pulse rounded-full bg-neutral-600 dark:bg-white" />
              </a>
            </p>
          )}
        </div>

        <h1 className="text-3xl font-bold sm:text-4xl md:text-6xl">
          Howdy, I'm <span className="text-blue-700 dark:text-white">Torch</span> 🙋‍♂️
        </h1>

        <p className="opacity-80">
          I'm an <span suppressHydrationWarning>~{age.toPrecision(7)}</span> year old Muslim
          software engineer from Indonesia. I'm interested in backend stuff and Alhamdulillah have{' '}
          {new Date().getFullYear() - 2015}+ years of experience in web development.
        </p>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold sm:text-3xl">What do I do? 💭</h1>
        <p className="opacity-80">
          Frankly, too many things to count on one hand... However, now I am very grateful to work
          at{' '}
          <a href="https://pratama.tech" target="_blank" rel="noreferrer">
            PST
          </a>
          , we are always building something for the government and private companies. Below are
          some of the most popular open source projects I've worked on. In total, the following repo
          rated me {projects.reduce<number>((acc, project) => acc + parseInt(project.stars, 10), 0)}{' '}
          stars. Thanks! 💖
        </p>

        <div className="grid auto-cols-max grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-3">
          {projects.map(project => (
            <ProjectCard key={project.repo} repo={project} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold sm:text-3xl">Technologies 💻</h1>

        <p className="opacity-80">
          I use various tools in my development process to improve the quality of my code. Below is
          a list of some of the technologies and languages I have experienced, or am currently
          working with.
        </p>

        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4">
          <ListItem icon={SiTypescript} text="TypeScript" />
          <ListItem icon={SiPhp} text="PHP" />
          <ListItem icon={SiJavascript} text="JavaScript" />
          <ListItem icon={SiAdonisjs} text="AdonisJS" />
          <ListItem icon={SiCodeigniter} text="CodeIgniter" />
          <ListItem icon={SiYarn} text="Yarn" />
          <ListItem icon={SiComposer} text="Composer" />
          <ListItem icon={SiMysql} text="MySQL" />
          <ListItem icon={SiFastify} text="Fastify" />
          <ListItem icon={SiExpress} text="Express.js" />
          <ListItem icon={SiJquery} text="jQuery" />
          <ListItem icon={SiGnubash} text="Bash" />
          <ListItem icon={SiNginx} text="Nginx" />
          <ListItem icon={SiDocker} text="Docker" />
          <ListItem icon={SiNodeDotJs} text="Node.js" />
          <ListItem icon={SiGit} text="Git" />
          <ListItem icon={SiRedis} text="Redis" />
          <ListItem icon={SiSupabase} text="Supabase" />
          <ListItem icon={SiVercel} text="Vercel" />
          <ListItem icon={SiCloudflare} text="Cloudflare" />
        </ul>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async function () {
  const pinnedRepos = await fetch('https://gh-pinned.nxl.sh/api/user/sooluh').then(
    async response => response.json() as Promise<PinnedRepo[]>,
  );

  const request = new Request(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);

  const response = await fetch(request);

  const body = (await response.json()) as LanyardResponse;

  if ('error' in body) {
    throw new LanyardError(request, response, body);
  }

  return {
    props: {pinnedRepos, lanyard: body.data},
    revalidate: 120,
  };
};
