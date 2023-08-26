import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateEventsDto, CreateEventsImageDto, UpdateEventsDto } from './events.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post('create')
  create(@Body() createEventsDto: CreateEventsDto) {
    return this.eventsService.create(createEventsDto);
  }

  @Post('image/create')
  createNewImage(@Body() createImageDto: CreateEventsImageDto) {
    return this.eventsService.createNewImage(createImageDto);
  }

  @Get()
  findAll(
    @Query("type") type?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('lan') language?: string,
    @Query('search') searchQuery?: string,
  ) {
    return this.eventsService.findAll(type, +page || 1, +limit || 6, searchQuery, language);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateEventsDto: UpdateEventsDto) {
    return this.eventsService.update(+id, updateEventsDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
