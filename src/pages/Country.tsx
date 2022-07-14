import { useNavigate } from 'react-router';
import {
	AspectRatio,
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	Image,
	VStack,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Feature from 'components/Feature';

const Country = () => {
	const navigate = useNavigate();

	return (
		<Box px={[3, 0]}>
			<VStack align='start' spacing={10}>
				<Button leftIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
					Back
				</Button>

				<Flex w='100%' direction={['column', 'row']} gap={12}>
					<Box w='100%'>
						<AspectRatio ratio={4 / 3}>
							<Image
								src='https://bit.ly/naruto-sage'
								alt='naruto'
								objectFit='cover'
							/>
						</AspectRatio>
					</Box>

					<Box w='100%'>
						<VStack
							minW={['30%', '30%', '30%', '50%']}
							align='stretch'
							spacing={[6, 8, 10]}>
							<Heading as='h2' size='md'>
								Konoha
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
										<Feature title='Native Name' desc='Belgie' />
										<Feature title='Population' desc='10,000,000' />
										<Feature title='Region' desc='Europe' />
										<Feature title='Sub Region' desc='Western Europe' />
										<Feature title='Capital' desc='Brussels' />
									</VStack>
								</GridItem>

								<GridItem>
									<VStack align='stretch'>
										<Feature title='Top Level Domain' desc='.be' />
										<Feature title='Currencies' desc={['Euro']} />
										<Feature
											title='Languages'
											desc={['Dutch', 'French', 'German']}
										/>
									</VStack>
								</GridItem>
							</Grid>
						</VStack>

						<Box mt={[0, 12, 14, 20]}>
							<Feature
								title='Border Countries'
								desc={['France', 'Germany', 'Netherlands']}
								boxed
							/>
						</Box>
					</Box>
				</Flex>
			</VStack>
		</Box>
	);
};

export default Country;
