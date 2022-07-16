import axios from './axios';

const getCountries = async (currPage: number, query: string) => {
	const res = await axios('countries?currPage=' + currPage + query);
	return res.data;
};

export default getCountries;
