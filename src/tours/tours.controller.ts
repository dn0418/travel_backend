import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ToursService } from './tours.service';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) { }

  @Post()
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
