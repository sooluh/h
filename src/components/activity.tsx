import {useLanyard} from 'use-lanyard';

export const DISCORD_ID = '590473615384772608';

export function Activity() {
	const {data: user} = useLanyard(DISCORD_ID);

	if (!user || !user.activities[0]) {
		return null;
	}

	return (
		<p className="text-right select-none sm:select-text w-full inline-flex text-lg rounded-sm focus:outline-none focus:opacity-100 focus:ring items-center space-x-2 no-underline opacity-50 hover:opacity-100 h-12 mt-0.5">
			<span className="truncate">
				Playing <span className="font-medium">{user.activities[0].name}</span>
			</span>
		</p>
	);
}
