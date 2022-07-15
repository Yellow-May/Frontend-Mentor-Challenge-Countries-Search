const apiRouter = require('express').Router();
const { default: axios } = require('axios');
const { default: StatusCodes } = require('http-status-codes');

const COUNTRIES_API_URL = 'https://restcountries.com/v3.1';
let ALL_COUNTRIES = [];

axios
	.get(`${COUNTRIES_API_URL}/all`)
	.then(res => (ALL_COUNTRIES = res.data))
	.catch(() => process.exit(1));

// get all countries
apiRouter.get('/countries', async (req, res) => {
	try {
		const { name, region } = req.query;
		let countries = ALL_COUNTRIES;

		if (name) {
			countries = countries.filter(data => {
				const names = [
					...data.altSpellings,
					data.name.common,
					data.name.official,
				];
				if (typeof data.capital === 'object') names.push(...data.capital);
				else if (typeof data.capital === 'string') names.push(data.capital);

				let hasName = false;

				names.forEach(cname => {
					if (cname.toUpperCase().indexOf(name.toUpperCase()) > -1)
						hasName = true;
				});

				return hasName;
			});
		}

		if (region) {
			countries = countries.filter(
				data => data.region.toUpperCase() === region.toUpperCase()
			);
		}

		const currPage = parseInt(req.query.currPage) || 0;
		const pageSize = 10;

		const section = countries
			.slice(currPage, currPage + pageSize)
			.map(country => ({
				name: country.name.official,
				flag: country.flags?.png,
				population: country.population.toLocaleString(),
				region: country.region,
				capital: country?.capital[0],
			}));

		const nextId =
			currPage < countries.length ? section[section.length - 1].id : null;

		return res.status(StatusCodes.OK).json({ countries: section, nextId });
	} catch (error) {
		console.error({ error });
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: 'There was an error', error });
	}
});

// get countries by full name https://restcountries.com/v3.1/name/{name}?fullText=true

module.exports = apiRouter;
