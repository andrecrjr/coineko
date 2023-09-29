import currencyList from './currencyListApi.json';

export type PageCurrencyQuery = {
	vs_currency: string;
	order: string;
	per_page: string;
	page: string;
	sparkline: string;
	price_change_percentage: string;
	category?: string;
};

export type Currency = typeof currencyList;

export type CoinGeckoDataRateLimit = {
	status?: {
		error_code: number;
		error_message: string;
	};
};

export type CurrencyList = Currency[] & CoinGeckoDataRateLimit;

export type PaginationState = {
	number: number;
};

export type CurrencyItem = {
	id: string;
	name: string;
	api_symbol: string;
	symbol: string;
	market_cap_rank: number;
	thumb: string;
	large: string;
};

export type searchType = {
	coins: CurrencyItem[];
};

export type CategoryProps = {
	params: { categoryPages: string[] };
	searchParams?: { [key: string]: string | string[] | undefined };
};
