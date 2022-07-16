import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import { Box, Center, Grid, GridItem, Spinner, VStack } from '@chakra-ui/react';
import CountryCard from 'components/CountryCard';
import SearchAndFilter from 'components/SearchAndFilter';

interface CountryProps {
	id: number;
	flag: string;
	name: string;
	population: string;
	region: string;
	capital: string;
}

const Countries = () => {
	const [query, setQuery] = useState<string>('');
	const { ref, inView } = useInView();

	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery(
			['countries', query],
			async ({ pageParam = 0 }) => {
				const res = await axios.get(
					'http://localhost:5000/api/countries?currPage=' + pageParam + query
				);
				return res.data;
			},
			{
				getNextPageParam: lastPage => lastPage.nextId ?? undefined,
			}
		);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<VStack align='stretch' spacing={14}>
			<SearchAndFilter {...{ query, setQuery }} />

			{isLoading && (
				<Center>
					<Spinner />
				</Center>
			)}

			{data && (
				<Box px={[5, 0]}>
					<Grid
						templateColumns={[
							'repeat(1, 1fr)',
							'repeat(3, 1fr)',
							'repeat(3, 1fr)',
						]}
						gap={16}>
						{data.pages.map(page => (
							<Fragment key={page.nextId}>
								{page.countries.map((country: CountryProps) => (
									<GridItem key={country.id}>
										<CountryCard {...country} />
									</GridItem>
								))}
							</Fragment>
						))}
					</Grid>
				</Box>
			)}

			<Center>
				<Spinner
					ref={ref}
					display={hasNextPage || isFetchingNextPage ? '' : 'none'}
				/>
			</Center>
		</VStack>
	);
};

export default Countries;
