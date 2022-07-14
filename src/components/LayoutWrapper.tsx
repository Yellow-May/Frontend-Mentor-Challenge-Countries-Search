import { Outlet } from 'react-router-dom';
import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Spacer,
	useColorMode,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const LayoutWrapper = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Box
				w='100%'
				py={[6, 4, 3]}
				shadow='md'
				bgColor={colorMode === 'light' ? 'white' : 'custom_blue.100'}>
				<Container maxW='container.lg'>
					<Flex align='center'>
						<Heading as='h1' size={['sm', 'md']}>
							Where in the world?
						</Heading>

						<Spacer />

						<Button
							variant='ghost'
							onClick={toggleColorMode}
							size={['xs', 'sm', 'md']}
							leftIcon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}>
							{colorMode === 'light' ? 'Light' : 'Dark'} Mode
						</Button>
					</Flex>
				</Container>
			</Box>

			<Container maxW='container.lg' py={[8, 10, 10, 24]}>
				<Outlet />
			</Container>
		</>
	);
};

export default LayoutWrapper;
