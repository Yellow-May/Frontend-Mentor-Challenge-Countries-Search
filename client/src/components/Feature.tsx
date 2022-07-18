import { FC } from 'react';
import { Badge, Flex, Text } from '@chakra-ui/react';

interface FeatureProps {
	title: string;
	desc: string | string[];
	boxed?: boolean;
}

const Feature: FC<FeatureProps> = ({ title, desc, boxed }) => {
	return (
		<Flex fontSize={14} gap={1} align='center' wrap='wrap' rowGap={3}>
			<Text fontWeight='bold'>{title}:</Text>
			{boxed ? (
				<Flex wrap='wrap' gap={3}>
					{typeof desc === 'string' ? (
						<Badge borderRadius={3} fontSize={10} p={3}>
							{desc}
						</Badge>
					) : (
						desc.map((b, index) => (
							<Badge key={index} borderRadius={3} fontSize={10} p={3}>
								{b}
							</Badge>
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
