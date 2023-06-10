import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTourTypeDto, UpdateTourTypeDto } from './tour-type.dto';
import { TourTypeService } from './tour-type.service';

@Controller('tour-type')
export class TourTypeController {
  constructor(private readonly tourTypeService: TourTypeService) { }

  @Post('create')
  create(@Body() createTourTypeDto: CreateTourTypeDto) {
    return this.tourTypeService.create(createTourTypeDto);
  }

  @Get()
  findAll() {
    return this.tourTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourTypeService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateTourTypeDto: UpdateTourTypeDto) {
    return this.tourTypeService.update(+id, updateTourTypeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.tourTypeService.remove(+id);
  }
}
