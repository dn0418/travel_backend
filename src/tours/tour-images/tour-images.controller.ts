import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTourImageDto, UpdateTourImageDto } from './tour-images.dto';
import { TourImagesService } from './tour-images.service';


@Controller('tour-images')
export class TourImagesController {
  constructor(private readonly tourImagesService: TourImagesService) { }

  @Post()
  create(@Body() createTourImageDto: CreateTourImageDto) {
    return this.tourImagesService.create(createTourImageDto);
  }

  @Get()
  findAll() {
    return this.tourImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourImageDto: UpdateTourImageDto) {
    return this.tourImagesService.update(+id, updateTourImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourImagesService.remove(+id);
  }
}
