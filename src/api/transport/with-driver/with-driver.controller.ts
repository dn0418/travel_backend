import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNewImageDto } from '../airport-transport/airport-transport.dto';
import { CreateNewPricingWithDriverDto, CreateWithDriverDto, UpdateWithDriverDto } from './with-driver.dto';
import { WithDriverService } from './with-driver.service';

@Controller('with-driver')
export class WithDriverController {
  constructor(private readonly withDriverService: WithDriverService) { }

  @Post()
  create(@Body() createWithDriverDto: CreateWithDriverDto) {
    return this.withDriverService.create(createWithDriverDto);
  }

  @Post('create/image')
  createNewImage(@Body() createNewImage: CreateNewImageDto) {
    return this.withDriverService.createNewImage(createNewImage);
  }

  @Post('pricing/create')
  createNewPrice(@Body() createPriceDto: CreateNewPricingWithDriverDto) {
    return this.withDriverService.createNewPrice(createPriceDto);
  }

  @Delete('pricing/delete/:id')
  deletePrice(@Param('id') id: string) {
    return this.withDriverService.deletePrice(+id);
  }

  @Get()
  findAll() {
    return this.withDriverService.findAll();
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateWithDriverDto: UpdateWithDriverDto) {
    return this.withDriverService.update(+id, updateWithDriverDto);
  }
}
