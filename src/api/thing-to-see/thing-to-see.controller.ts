import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateThingToSeeDto, UpdateThingToSeeDto } from './thing-to-see.dto';
import { ThingToSeeService } from './thing-to-see.service';

@Controller('thing-to-see')
export class ThingToSeeController {
  constructor(private readonly thingToSeeService: ThingToSeeService) { }

  @Post('create')
  create(@Body() createThingToSeeDto: CreateThingToSeeDto) {
    return this.thingToSeeService.create(createThingToSeeDto);
  }

  @Get()
  findAll(
    @Query("type") type?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('lan') language?: string,
    @Query('search') searchQuery?: string,
  ) {
    return this.thingToSeeService.findAll(
      type,
      +page || 1,
      +limit || 6,
      searchQuery,
      language
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thingToSeeService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateThingToSeeDto: UpdateThingToSeeDto) {
    return this.thingToSeeService.update(+id, updateThingToSeeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.thingToSeeService.remove(+id);
  }
}
