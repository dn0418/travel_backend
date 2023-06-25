import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TourAccessoriesService } from './tour-accessories.service';
import { CreateTourAccessoryDto, UpdateTourAccessoryDto } from './tour-accessory.dto';

@Controller('tour-accessories')
export class TourAccessoriesController {
  constructor(private readonly tourAccessoriesService: TourAccessoriesService) { }

  @Post('create')
  create(@Body() createTourAccessoryDto: CreateTourAccessoryDto) {
    return this.tourAccessoriesService.create(createTourAccessoryDto);
  }

  @Get()
  findAll() {
    return this.tourAccessoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourAccessoriesService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateTourAccessoryDto: UpdateTourAccessoryDto) {
    return this.tourAccessoriesService.update(+id, updateTourAccessoryDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.tourAccessoriesService.remove(+id);
  }
}
