import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from 'theme';
import App from 'App';

const client = new QueryClient();
createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={client}>
			<BrowserRouter>
				<ColorModeScript initialColorMode={theme.config.intialColorMode} />

				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</BrowserRouter>

			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
		</QueryClientProvider>
	</StrictMode>
);
