import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Button, Flex, Text } from '@chakra-ui/react';

interface FeatureProps {
	title: string;
	desc: string | string[];
	boxed?: boolean;
}

const Feature: FC<FeatureProps> = ({ title, desc, boxed }) => {
	const navigate = useNavigate();

	return (
		<Flex fontSize={14} gap={1} align='center' wrap='wrap' rowGap={3}>
			<Text fontWeight='bold'>{title}:</Text>
			{boxed ? (
				<Flex wrap='wrap' gap={3}>
					{typeof desc === 'string' ? (
						<Button p={1} onClick={() => navigate(`/${desc}`)}>
							{desc}
						</Button>
					) : (
						desc.map((b, index) => (
							<Button
								key={index}
								borderRadius={3}
								fontSize={11}
								size='sm'
								p={4}
								onClick={() => navigate(`/${b}`)}>
								{b}
							</Button>
						))
					)}
				</Flex>
			) : (
				<Text>{typeof desc === 'string' ? desc : desc.join(', ')}</Text>
			)}
		</Flex>
	);
};

export default Feature;
