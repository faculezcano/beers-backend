import { Module } from '@nestjs/common';
import { BeersService } from './beers.service';
import { BeersController } from './beers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Beer, BeerSchema } from './schemas/beer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Beer.name, schema: BeerSchema }]),
  ],
  controllers: [BeersController],
  providers: [BeersService],
})
export class BeersModule {}
