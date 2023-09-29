import { Metadata } from 'next';

import { fetchService } from '@/services/ApiService';

import { CurrencyList } from '@/types';

import { convertFilterQueryString, getMetadataName } from '@/utils';
import { TableComposition } from '@/components/shared/Layout';
import ErrorPage from '@/components/Page/ErrorPage';
import { MenuOptionsWithoutPortfolio } from '@/components/Header/menu';

type Props = {
	params: { categoryPages: string[] };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const metadata = await fetchService.getFetchData<
		[{ category_id: string; name: string }]
	>('/coins/categories/list');

	const titleSection = getMetadataName(metadata, params.categoryPages[0]);
	const pageNumber = parseInt(params.categoryPages[1] || '1');
	const paginationTitle = pageNumber > 1 ? ` - Page ${pageNumber}` : '';
	return {
		title: titleSection?.name + paginationTitle
	};
}

// RATE LIMIT CAN'T MAKE IT EASY FOR US... SAD
export async function generateStaticParams() {
	const paths = MenuOptionsWithoutPortfolio.map(item => ({
		categoryPages: [item.path]
	}));
	return paths;
}

export default async function TablePages({ params }: Props) {
	const [categoryPage, id] = params.categoryPages;
	const queryUrl = convertFilterQueryString(
		{
			vs_currency: 'usd',
			order: 'market_cap_desc',
			per_page: '50',
			sparkline: 'true',
			page: id,
			price_change_percentage: '1h,24h,7d',
			category: categoryPage
		},
		'/coins/markets?'
	);
	const data = await fetchService.getFetchData<CurrencyList>(queryUrl);
	const metadata = await fetchService.getFetchData<
		[{ category_id: string; name: string }]
	>('/coins/categories/list');
	const titleSection = getMetadataName(metadata, categoryPage);

	if (data?.status?.error_code) {
		return <ErrorPage />;
	}
	return (
		<TableComposition
			data={data}
			tableDescription={`${titleSection.name} currencies by Market Capitalization.`}
		/>
	);
}
