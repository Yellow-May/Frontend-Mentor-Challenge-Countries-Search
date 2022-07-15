const apiRouter = require('express').Router();
const { default: axios } = require('axios');

const COUNTRIES_API_URL = 'https://restcountries.com/v3.1';
let ALL_COUNTRIES = [];

axios
	.get(`${COUNTRIES_API_URL}/all`)
	.then(res => (ALL_COUNTRIES = res.data))
	.catch(() => process.exit(1));

module.exports = apiRouter;
