import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import theme from 'theme';
import App from 'App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ColorModeScript initialColorMode={theme.config.intialColorMode} />

			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
);
