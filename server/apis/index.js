const apiRouter = require('express').Router();
const { default: axios } = require('axios');
const { default: StatusCodes } = require('http-status-codes');

const COUNTRIES_API_URL = 'https://restcountries.com/v3.1';
let ALL_COUNTRIES = [];

axios
	.get(`${COUNTRIES_API_URL}/all`)
	.then(
		res => (ALL_COUNTRIES = res.data.map((e, idx) => ({ ...e, id: idx + 1 })))
	)
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

				if (data.name.nativeName)
					names.push(
						...Object.keys(data.name?.nativeName).map(
							c => data.name?.nativeName[c].official
						)
					);

				if (data.fifa) names.push(data.fifa);

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
		const pageSize = 12;

		const section = countries
			.slice(currPage, currPage + pageSize)
			?.map(country => ({
				id: country.id,
				name: country.name?.official,
				flag: country.flags?.png,
				population: country?.population.toLocaleString(),
				region: country?.region,
				capital: country?.capital,
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

// get countries by official name
apiRouter.get('/country/:name', (req, res) => {
	const name = req.params.name;
	const data = ALL_COUNTRIES.find(e => e.name.official === name);

	if (!data)
		return res
			.status(StatusCodes.NOT_FOUND)
			.json({ message: 'Country not found' });

	const country = {
		name: data.name.official,
		nativeName: data.name.nativeName[Object.keys(data?.languages)[0]].official,
		flag: data.flags?.png,
		population: data.population.toLocaleString(),
		region: data.region,
		subregion: data.subregion,
		capital: data.capital[0],
		currencies: Object.keys(data.currencies).map(
			c => `${data.currencies[c]?.name} (${data.currencies[c]?.symbol})`
		),
		languages: Object.keys(data.languages).map(c => data.languages[c]),
		timezones: data.timezones,
		tld: data.tld,
		borders: data.borders,
	};

	res.status(StatusCodes.OK).json(country);
});

module.exports = apiRouter;
