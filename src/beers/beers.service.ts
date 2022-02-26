import { Injectable } from '@nestjs/common';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { Beer, BeerDocument } from "./schemas/beer.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class BeersService {
  constructor(
    @InjectModel(Beer.name) private readonly beerModel: Model<BeerDocument>,
  ) {}

  async create(createBeerDto: CreateBeerDto): Promise<Beer> {
    return await this.beerModel.create(createBeerDto);
  }

  async findAll(): Promise<Beer[]> {
    return await this.beerModel.find().exec();
  }

  async findOne(id: number) {
    return await this.beerModel.findOne({ _id: id }).exec();
  }

  async update(id: number, updateBeerDto: UpdateBeerDto) {
    return await this.beerModel.updateOne({ _id: id }, updateBeerDto).exec();
  }

  async remove(id: number) {
    return this.beerModel.findOneAndRemove({ _id: id }).exec();
  }
}
