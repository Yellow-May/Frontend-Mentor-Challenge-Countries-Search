const express = require('express');
const path = require('node:path');
const root = require('app-root-path');
const cors = require('cors');
const apiRouter = require('./apis');

const app = express();

// custom api router
app.use(cors());
app.use('/api', apiRouter);

// serve static files
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (_req, res) => {
		res.sendFile(path.resolve(root.path, 'client', 'build', 'index.html'));
	});
}

module.exports = app;
