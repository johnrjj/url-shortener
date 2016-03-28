import express from 'express';
import config from './config';
import api from './lib/routes/api';
import lookup from './lib/routes/lookup';
import createModel from './lib/model';
import createDatabase from './lib/db';

const env = config.env;
const port = config.port;
const db = createDatabase(config);
const model = createModel(db);
const app = express();

app.set('trust proxy', true);

app.use('/', express.static(__dirname + '/client'));
// Generate short url route
app.use('/api', api(model));
// Lookup tinylink and route to proper website url
app.use('/', lookup(model));

// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});
// Basic error handler
app.use((err, req, res) => {
  if (env === 'dev') {
    console.log(err);
    res.status(500).send(err.response || 'no error response!');
  } else {
    res.status(500).send('internal server error');
  }
});
app.listen(port, () => {
  console.log(`Link shortner listening on port ${port}`);
  console.log('http://baseurl/ for ui to create a shortlink');
  console.log('http://baseurl/SHORTENEDLINK to redirect to the actual url');
  console.log('http://baseurl/api/ POST to shorten a link');
});
