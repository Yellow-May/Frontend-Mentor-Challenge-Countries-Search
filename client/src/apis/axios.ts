import axios from 'axios';

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:5000/api'
			: 'api',
	method: 'GET',
});

export default instance;
