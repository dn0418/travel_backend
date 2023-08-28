import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateImageDto, CreateTourDto, UpdateTourDto } from './tour.dto';
import { ToursService } from './tours.service';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) { }

  @Post('create')
  create(@Body() createTourDto: CreateTourDto) {
    return this.toursService.create(createTourDto);
  }

  @Post('image/create')
  createNewImage(@Body() createImageDto: CreateImageDto) {
    return this.toursService.createNewImage(createImageDto);
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
    @Query('lan') language?: string,
    @Query('child') child?: string,
  ) {
    return this.toursService.findAll(
      type,
      +page || 1,
      +limit || 6,
      searchQuery,
      destination,
      days,
      month,
      language,
      child
    );
  }

  @Get('related')
  findRealated() {
    return this.toursService.findRealated();
  }

  @Get('one-day')
  findOneDay(@Query('lan') language?: string) {
    return this.toursService.findOneDay(language);
  }

  @Get('fixed-date')
  findFixedDate(@Query('lan') language?: string) {
    return this.toursService.findFixedDate(language);
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
