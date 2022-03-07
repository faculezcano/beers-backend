import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BeersService } from './beers.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { AuthGuard } from '@nestjs/passport';
import { LogInterceptor } from '../logs/log.interceptor';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(LogInterceptor)
@Controller('beers')
export class BeersController {
  constructor(private readonly beersService: BeersService) {}

  @Post()
  create(@Body() createBeerDto: CreateBeerDto) {
    return this.beersService.create(createBeerDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.beersService.findAll(query);
  }

  @Get('search')
  search(@Query() query) {
    return this.beersService.search(query.q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBeerDto: UpdateBeerDto) {
    return this.beersService.update(+id, updateBeerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beersService.remove(+id);
  }
}
