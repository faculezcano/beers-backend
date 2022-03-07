import { Injectable } from '@nestjs/common';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { Beer, BeerDocument } from './schemas/beer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BeersService {
  constructor(
    @InjectModel(Beer.name) private readonly beerModel: Model<BeerDocument>,
  ) {}

  async create(createBeerDto: CreateBeerDto): Promise<Beer> {
    return await this.beerModel.create(createBeerDto);
  }

  async findAll(params: any): Promise<Beer[]> {
    let filter: any = params.filter || {};

    if (params.q) {
      const regExp = new RegExp(params.q, 'i');

      let searchQuery = [];

      searchQuery.push({
        // name term search
        name: regExp,
      });
      searchQuery.push({
        // yeast term search
        'ingredients.yeast': regExp,
      });
      searchQuery.push({
        // malt term search
        'ingredients.malt.name': regExp,
      });
      searchQuery.push({
        // hops term search
        'ingredients.hops.name': regExp,
      });

      filter.$or = searchQuery;
    }

    let query = this.beerModel.find(filter);

    if (params.order) {
      query.sort(params.order);
    }
    return await query.exec();
  }

  async search(term: string) {
    const regExp = new RegExp(term, 'i');

    const beers = (
      await this.beerModel
        .find(
          {
            name: regExp,
          },
          {
            name: 1,
          },
        )
        .exec()
    ).map((item) => ({
      type: 'beer',
      value: item.name,
    }));

    const hops = (
      await this.beerModel
        .find(
          {
            'ingredients.hops.name': regExp,
          },
          {
            'ingredients.hops.$': 1,
          },
        )
        .exec()
    ).map((item) => ({
      type: 'hops',
      value: item.ingredients.hops[0].name,
    }));

    const malts = (
      await this.beerModel
        .find(
          {
            'ingredients.malt.name': regExp,
          },
          {
            'ingredients.malt.$': 1,
          },
        )
        .exec()
    ).map((item) => ({
      type: 'malt',
      value: item.ingredients.malt[0].name,
    }));

    const yeasts = (
      await this.beerModel
        .find(
          {
            'ingredients.yeast': regExp,
          },
          {
            'ingredients.yeast': 1,
          },
        )
        .exec()
    ).map((item) => ({
      type: 'yeast',
      value: item.ingredients.yeast,
    }));

    let keywords = [...beers, ...hops, ...malts, ...yeasts];

    return keywords.filter((item, index, self) => {
      return (
        index ===
        self.findIndex((b) => b.type == item.type && b.value == item.value)
      );
    });
  }

  async getTopUsedIngredients() {
    let ingredients = [];

    const maltQuery = this.beerModel.aggregate([
      {
        $unwind: {
          path: '$ingredients.malt',
        },
      },
      {
        $group: {
          _id: '$ingredients.malt.name',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    ingredients = (await maltQuery.exec()).map((item) => ({
      name: item._id,
      type: 'malt',
      count: item.count,
    }));

    let hopsQuery = this.beerModel.aggregate([
      {
        $unwind: '$ingredients.hops',
      },
      {
        $group: {
          _id: '$ingredients.hops.name',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    ingredients = ingredients.concat(
      (await hopsQuery.exec()).map((item) => ({
        name: item._id,
        type: 'hops',
        count: item.count,
      })),
    );

    let yeastQuery = this.beerModel.aggregate([
      {
        $group: {
          _id: '$ingredients.yeast',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    ingredients = ingredients.concat(
      (await yeastQuery.exec()).map((item) => ({
        name: item._id,
        type: 'yeast',
        count: item.count,
      })),
    );

    return ingredients
      .filter((item, index, self) => {
        return index === self.findIndex((b) => item.name == b.name);
      })
      .sort((a, b) => b.count - a.count)
      .splice(0, 10);
  }

  async findOne(id: string) {
    return await this.beerModel.findOne({ _id: id }).exec();
  }

  async update(id: number, updateBeerDto: UpdateBeerDto) {
    return await this.beerModel.updateOne({ _id: id }, updateBeerDto).exec();
  }

  async remove(id: number) {
    return this.beerModel.findOneAndRemove({ _id: id }).exec();
  }
}
