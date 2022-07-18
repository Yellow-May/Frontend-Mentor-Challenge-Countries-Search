import axios from './axios';

const getCountry = async (name: string) => {
	const res = await axios(`country${name}`);
	return res.data;
};

export default getCountry;
