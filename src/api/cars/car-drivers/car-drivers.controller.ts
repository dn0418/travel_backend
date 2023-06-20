import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCarDriverDto, UpdateCarDriverDto } from './car-driver.dto';
import { CarDriversService } from './car-drivers.service';

@Controller('car-drivers')
export class CarDriversController {
  constructor(private readonly carDriversService: CarDriversService) { }

  @Post('create')
  create(@Body() createCarDriverDto: CreateCarDriverDto) {
    return this.carDriversService.create(createCarDriverDto);
  }

  @Get()
  findAll() {
    return this.carDriversService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carDriversService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCarDriverDto: UpdateCarDriverDto) {
    return this.carDriversService.update(+id, updateCarDriverDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.carDriversService.remove(+id);
  }
}
