import { BeerSchema } from './beers/schemas/beer.schema';

const axios = require('axios');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/beers');

const Beer = mongoose.model('Beer', BeerSchema);

axios
  .get('https://api.punkapi.com/v2/beers?per_page=80')
  .then(async (response) => {
    await Beer.create(response.data);
    return response;
  });

process.exit(0);
