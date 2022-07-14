import { useNavigate } from 'react-router';
import {
	AspectRatio,
	Box,
	Image,
	VStack,
	Heading,
	useColorMode,
} from '@chakra-ui/react';
import Feature from './Feature';

const CountryCard = () => {
	const { colorMode } = useColorMode();
	const navigate = useNavigate();

	return (
		<Box
			w='100%'
			borderRadius={10}
			overflow='hidden'
			shadow='lg'
			cursor='pointer'
			onClick={() => navigate('Konoha')}>
			<AspectRatio maxW='100%' ratio={5 / 3}>
				<Image
					src='https://bit.ly/naruto-sage'
					alt='naruto'
					objectFit='cover'
				/>
			</AspectRatio>
			<Box p={6} bg={colorMode === 'light' ? 'white' : 'custom_blue.100'}>
				<VStack align='stretch' spacing={5} justify='center' h='100%'>
					<Heading as='h2' size='md' noOfLines={1}>
						Konoha
					</Heading>

					<VStack align='stretch'>
						<Feature title='Population' desc='100,000,000' />
						<Feature title='Region' desc='Americas' />
						<Feature title='Capital' desc='Hidden Leaf' />
					</VStack>
				</VStack>
			</Box>
		</Box>
	);
};

export default CountryCard;
