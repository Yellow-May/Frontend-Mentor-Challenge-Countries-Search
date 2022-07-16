import { useNavigate } from 'react-router';
import {
	AspectRatio,
	Box,
	Button,
	Center,
	Flex,
	Grid,
	GridItem,
	Heading,
	Image,
	Spinner,
	VStack,
	Text,
} from '@chakra-ui/react';
import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import Feature from 'components/Feature';
import { useLocation } from 'react-router';
import axios from 'axios';

const Country = () => {
	const navigate = useNavigate();
	const { pathname: name } = useLocation();

	const { isLoading, isError, data, refetch } = useQuery(
		['country', name],
		async () => {
			const res = await axios.get(`http://localhost:5000/api/country${name}`);
			return res.data;
		}
	);

	return (
		<Box px={[3, 0]}>
			<VStack align='start' spacing={10}>
				<Button leftIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
					Back
				</Button>

				{isLoading && (
					<Center h={200} w='100%'>
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
					<Flex w='100%' direction={['column', 'row']} gap={12}>
						<Box w='100%'>
							<AspectRatio ratio={4 / 3}>
								<Image src={data.flag} alt='naruto' objectFit='cover' />
							</AspectRatio>
						</Box>

						<Box w='100%'>
							<VStack
								minW={['30%', '30%', '30%', '50%']}
								align='stretch'
								spacing={[6, 8, 10]}>
								<Heading as='h2' size='md'>
									{data.name}
								</Heading>

								<Grid
									templateColumns={[
										'repeat(1, 1fr)',
										'repeat(1, 1fr)',
										'repeat(1, 1fr)',
										'repeat(2, 1fr)',
									]}
									gap={[8, 12, 12, 1]}>
									<GridItem>
										<VStack align='stretch'>
											{data.nativeName && (
												<Feature title='Native Name' desc={data.nativeName} />
											)}
											{data.population && (
												<Feature title='Population' desc={data.population} />
											)}
											{data.region && (
												<Feature title='Region' desc={data.region} />
											)}
											{data.subregion && (
												<Feature title='Sub Region' desc={data.subregion} />
											)}
											{data.capital && (
												<Feature title='Capital' desc={data.capital} />
											)}
										</VStack>
									</GridItem>

									<GridItem>
										<VStack align='stretch'>
											{data.tld && (
												<Feature title='Top Level Domain' desc={data.tld} />
											)}
											{data?.currencies && (
												<Feature title='Currencies' desc={data.currencies} />
											)}
											{data?.languages && (
												<Feature title='Languages' desc={data.languages} />
											)}
											{data?.timezones && (
												<Feature title='Timezones' desc={data.timezones} />
											)}
										</VStack>
									</GridItem>
								</Grid>
							</VStack>

							{data?.borders && (
								<Box mt={[12, 12, 14, 20]}>
									<Feature title='Border Countries' desc={data.borders} boxed />
								</Box>
							)}
						</Box>
					</Flex>
				)}
			</VStack>
		</Box>
	);
};

export default Country;
