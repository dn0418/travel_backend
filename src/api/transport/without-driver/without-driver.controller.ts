import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCarDto, CreatePricingWithoutDriverDto, UpdateCarDto } from './without-driver.dto';
import { CarsService } from './without-driver.service';

@Controller('without-driver')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }

  @Post('create')
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Post('pricing/create')
  createNewPrice(@Body() createPriceDto: CreatePricingWithoutDriverDto) {
    return this.carsService.createNewPrice(createPriceDto);
  }

  @Delete('pricing/delete/:id')
  deletePrice(@Param('id') id: string) {
    return this.carsService.deletePrice(+id);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery: string,
    @Query('lan') language?: string,
  ) {
    return this.carsService.findAll(+page || 1, +limit || 6, searchQuery || '', language);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
