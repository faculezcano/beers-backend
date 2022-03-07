import * as moment from 'moment';
import { BeerSchema } from './beers/schemas/beer.schema';

const axios = require('axios');
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/beers');

const Beer = mongoose.model('Beer', BeerSchema);

const seed = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://api.punkapi.com/v2/beers?per_page=80')
      .then(async (response) => {
        let items = response.data.map((item) => {
          item.first_brewed = moment(
            item.first_brewed,
            'MM/YYYY',
          ).toISOString();
          return item;
        });

        await Beer.create(items);

        resolve(response);
        return response;
      })
      .catch((err) => {
        reject(err);
        return err;
      });
  });
};

seed()
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(-1);
  });
