import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateTourDto, UpdateTourDto } from './tour.dto';
import { ToursService } from './tours.service';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) { }

  @Post('create')
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Get()
  findAll(
    @Query("type") type?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('destination') destination?: string,
    @Query('days') days?: string,
    @Query('month') month?: string,
    @Query('search') searchQuery?: string,
  ) {
    return this.toursService.findAll(
      type,
      +page || 1,
      +limit || 6,
      searchQuery,
      destination,
      days,
      month,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
