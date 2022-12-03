import Link from 'next/link';
import {type ReactNode} from 'react';

export function NavLink(props: {children: ReactNode; href: string; closeMenu?: () => void}) {
  return (
	<li className="shrink-0">
		<Link
			href={props.href}
			className="block py-3 font-mono text-lg dark:hover:text-white no-underline dark:sm:hover:bg-white/10 rounded-md sm:inline-block sm:px-5 sm:text-sm sm:font-normal sm:bg-white/0 sm:hover:bg-neutral-900/5 sm:rounded-full"
			onClick={props.closeMenu}
		>
			{props.children}
		</Link>
	</li>
  );
}
