import { Box, Grid, GridItem, VStack } from '@chakra-ui/react';
import CountryCard from 'components/CountryCard';
import SearchAndFilter from 'components/SearchAndFilter';

const Countries = () => {
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
						<CountryCard />
					</GridItem>
				</Grid>
			</Box>
		</VStack>
	);
};

export default Countries;
