import { ArrowUpIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

const BackToTop = () => {
	return (
		<Button
			position='fixed'
			right={3}
			bottom={3}
			borderRadius='50%'
			p='2'
			onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
			<ArrowUpIcon />
		</Button>
	);
};

export default BackToTop;
