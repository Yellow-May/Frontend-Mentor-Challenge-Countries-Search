import { SearchIcon } from '@chakra-ui/icons';
import {
	Flex,
	InputGroup,
	InputLeftAddon,
	Input,
	Spacer,
	Select,
} from '@chakra-ui/react';
import {
	ChangeEventHandler,
	useRef,
	Dispatch,
	SetStateAction,
	FC,
	useState,
} from 'react';

interface SearchAndFilterProps {
	query: string;
	setQuery: Dispatch<SetStateAction<string>>;
}

const filterOptions = ['africa', 'americas', 'asia', 'europe', 'oceania'];

const SearchAndFilter: FC<SearchAndFilterProps> = ({ query, setQuery }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [filterQuery, setFilterQuery] = useState('');
	const searchInput = useRef<HTMLInputElement | null>(null);

	const handleSearch = () => {
		const value = searchInput.current?.value;
		if (value) {
			setSearchQuery(`&name=${value}`);
			setQuery(`&name=${value}` + filterQuery);
		} else {
			setSearchQuery('');
			setQuery('' + filterQuery);
		}
	};

	const handleFilter: ChangeEventHandler<HTMLSelectElement> = e => {
		const value = e.target.value;
		if (value) {
			setFilterQuery(`&region=${value}`);
			setQuery(searchQuery + `&region=${value}`);
		} else {
			setFilterQuery('');
			setQuery(searchQuery + '');
		}
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
					<option
						key={prop}
						value={prop}
						style={{ textTransform: 'capitalize' }}>
						{prop}
					</option>
				))}
			</Select>
		</Flex>
	);
};

export default SearchAndFilter;
