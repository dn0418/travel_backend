import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateThingToDoDto, UpdateThingToDoDto } from './thing-to-do.dto';
import { ThingToDoService } from './thing-to-do.service';

@Controller('thing-to-do')
export class ThingToDoController {
  constructor(private readonly thingToDoService: ThingToDoService) { }

  @Post('create')
  create(@Body() createThingToDoDto: CreateThingToDoDto) {
    return this.thingToDoService.create(createThingToDoDto);
  }

  @Get()
  findAll() {
    return this.thingToDoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thingToDoService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateThingToDoDto: UpdateThingToDoDto) {
    return this.thingToDoService.update(+id, updateThingToDoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.thingToDoService.remove(+id);
  }
}
