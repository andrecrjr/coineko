import menu from './menu.json';

type Menu = typeof menu;
export const MenuOptions: Menu = menu;

export const MenuOptionsWithoutPortfolio: Menu = menu.filter(
	item => item.path !== 'portfolio'
);
