/* eslint-disable no-console */
const app = require('./app');

app.listen(process.env.PORT || 5000, () => console.info('Server started'));
