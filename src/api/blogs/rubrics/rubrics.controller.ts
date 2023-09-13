import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRubricDto, UpdateRubricDto } from './rubric.dto';
import { RubricsService } from './rubrics.service';

@Controller('rubrics')
export class RubricsController {
  constructor(private readonly rubricsService: RubricsService) { }

  @Post('create')
  create(@Body() createRubricDto: CreateRubricDto) {
    return this.rubricsService.create(createRubricDto);
  }

  @Get()
  findAll() {
    return this.rubricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rubricsService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateRubricDto: UpdateRubricDto) {
    return this.rubricsService.update(+id, updateRubricDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.rubricsService.remove(+id);
  }
}
