import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { Box, Grid, GridItem, Spinner, VStack } from '@chakra-ui/react';
import CountryCard from 'components/CountryCard';
import SearchAndFilter from 'components/SearchAndFilter';

interface CountryProps {
	flag: string;
	name: string;
	population: number;
	region: string;
	capital: string;
}

const Countries = () => {
	const { ref, inView } = useInView();

	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
		useInfiniteQuery(
			'countries',
			async ({ pageParam = 0 }) => {
				const res = await axios.get(
					'http://localhost:5000/countries?currPage=' + pageParam
				);
				return res.data;
			},
			{ getNextPageParam: lastPage => lastPage.nextId ?? undefined }
		);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<VStack align='stretch' spacing={14}>
			<SearchAndFilter />

			<Box px={[5, 0]}>
				<Grid
					templateColumns={[
						'repeat(1, 1fr)',
						'repeat(3, 1fr)',
						'repeat(3, 1fr)',
					]}
					gap={16}>
					<GridItem>
						{data &&
							data.pages.map(page => (
								<Fragment key={page.nextId}>
									{page.countries.map((country: CountryProps) => (
										<CountryCard {...country} />
									))}
								</Fragment>
							))}
					</GridItem>
				</Grid>
			</Box>
			<Box ref={ref}>
				<Spinner display={!hasNextPage || isFetchingNextPage ? 'none' : ''} />
			</Box>
		</VStack>
	);
};

export default Countries;
