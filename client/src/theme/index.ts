import {
	extendTheme,
	ThemeComponentProps,
	type ThemeConfig,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

const styles = {
	global: (props: ThemeComponentProps) => ({
		'html, body': {
			backgroundColor: mode('custom_gray.100', 'custom_blue.300')(props),
		},
	}),
};

const colors = {
	custom_blue: {
		100: 'hsl(209, 23%, 22%)',
		200: 'hsl(200, 15%, 8%)',
		300: 'hsl(207, 26%, 17%)',
	},
	custom_gray: {
		100: 'hsl(0, 0%, 98%)',
		200: 'hsl(0, 0%, 52%)',
	},
};

const theme = extendTheme({ config, colors, styles });

export default theme;
