import { FC } from 'react';
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

interface CountryCardProps {
	flag?: string;
	name: string;
	population?: string;
	region?: string;
	capital?: string;
}

const CountryCard: FC<CountryCardProps> = ({
	flag,
	name,
	population,
	region,
	capital,
}) => {
	const { colorMode } = useColorMode();
	const navigate = useNavigate();

	return (
		<Box
			w='100%'
			borderRadius={10}
			overflow='hidden'
			shadow='lg'
			cursor='pointer'
			onClick={() => navigate(name)}>
			<AspectRatio maxW='100%' ratio={5 / 3}>
				<Image src={flag} alt={name} objectFit='cover' />
			</AspectRatio>
			<Box p={6} bg={colorMode === 'light' ? 'white' : 'custom_blue.100'}>
				<VStack align='stretch' spacing={5} justify='center' h='100%'>
					<Heading as='h2' size='md' noOfLines={1}>
						{name}
					</Heading>

					<VStack align='stretch'>
						{population && <Feature title='Population' desc={population} />}
						{region && <Feature title='Region' desc={region} />}
						{capital && <Feature title='Capital' desc={capital} />}
					</VStack>
				</VStack>
			</Box>
		</Box>
	);
};

export default CountryCard;
