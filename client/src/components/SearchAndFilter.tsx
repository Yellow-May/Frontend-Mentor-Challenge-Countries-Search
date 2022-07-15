import { SearchIcon } from '@chakra-ui/icons';
import {
	Flex,
	InputGroup,
	InputLeftAddon,
	Input,
	Spacer,
	Select,
} from '@chakra-ui/react';
import { ChangeEventHandler, useRef } from 'react';

const filterOptions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

const SearchAndFilter = () => {
	const searchInput = useRef<HTMLInputElement | null>(null);

	const handleSearch = () => {
		const value = searchInput.current?.value;
		console.log(value);
	};

	const handleFilter: ChangeEventHandler<HTMLSelectElement> = e => {
		const value = e.target.value;
		console.log(value);
	};

	return (
		<Flex direction={['column', 'row']} rowGap={4}>
			<InputGroup
				maxW={360}
				size={['md', 'lg']}
				shadow='md'
				border='thin solid'
				borderColor='inherit'
				borderRadius={6}>
				<InputLeftAddon
					bg='transparent'
					border='none'
					children={<SearchIcon />}
				/>
				<Input
					placeholder='Search for a country...'
					border='none'
					ref={searchInput}
					onChange={handleSearch}
				/>
			</InputGroup>

			<Spacer />

			<Select
				placeholder='Filter by Region'
				w={['55%']}
				maxW={260}
				size={['md', 'lg']}
				shadow='md'
				onChange={handleFilter}>
				{filterOptions.map(prop => (
					<option key={prop} value={prop}>
						{prop}
					</option>
				))}
			</Select>
		</Flex>
	);
};

export default SearchAndFilter;
