import React from 'react';
import { MenuOptions } from './menu';
import Link from 'next/link';
import { headers } from 'next/headers';

const Menu = () => {
	const headersList = headers();
	const host = headersList.get('host');

	const hostname =
		process.env.NODE_ENV === 'development' && host
			? 'http://localhost:3000/'
			: 'https://' + host?.split(':')[0];

	return (
		<nav
			className="w-full bg-purple-neko-500 overflow-x-hidden overflow-y-hidden
			h-auto sm:h-20 flex content-center sm:justify-center sm:overflow-hidden"
		>
			<ul className="list-none flex self-center items-center justify-between overflow-x-scroll overflow-y-hidden">
				{MenuOptions.map((item, index) => {
					let route = hostname + '/' + item.path;
					if (item.path !== 'portfolio') {
						route = hostname + '/page/' + item.path;
					}

					return (
						<Link
							href={{
								pathname: route
							}}
							key={index}
						>
							<li
								className={
									'text-[1rem] sm:text-[0.875rem] leading-5 px-8 sm:py-6 font-roboto'
								}
								data-testid={`button-${item.alias.toLowerCase()}`}
							>
								{item.alias}
							</li>
						</Link>
					);
				})}
			</ul>
		</nav>
	);
};

export default Menu;
