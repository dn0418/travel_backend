import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateDestinationDto, UpdateDestinationDto } from './destination.dto';
import { DestinationsService } from './destinations.service';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) { }

  @Post('create')
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationsService.create(createDestinationDto);
  }

  @Get()
  findAll() {
    return this.destinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinationsService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateDestinationDto: UpdateDestinationDto) {
    return this.destinationsService.update(+id, updateDestinationDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.destinationsService.remove(+id);
  }
}
