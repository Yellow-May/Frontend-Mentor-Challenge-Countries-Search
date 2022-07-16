import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import {
	Box,
	Center,
	Grid,
	GridItem,
	Spinner,
	VStack,
	Flex,
	Button,
	Text,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import CountryCard from 'components/CountryCard';
import SearchAndFilter from 'components/SearchAndFilter';
import getCountries from 'apis/getCountries';

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

	const {
		data,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		refetch,
	} = useInfiniteQuery(
		['countries', query],
		async ({ pageParam = 0 }) => getCountries(pageParam, query),
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
				<Center h={250} w='100%'>
					<Spinner />
				</Center>
			)}

			{isError && (
				<Flex
					direction='column'
					align='center'
					justify='center'
					gap={8}
					h={250}
					w='100%'>
					<Text>There was an error, please try again</Text>

					<Button onClick={() => refetch()}>
						<RepeatIcon />
					</Button>
				</Flex>
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
