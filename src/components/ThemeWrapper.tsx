import { ChakraProvider } from '@chakra-ui/react';
import theme from 'styles/theme';

const ThemeWrapper = () => {
	return <ChakraProvider theme={theme}>ThemeWrapper</ChakraProvider>;
};

export default ThemeWrapper;
