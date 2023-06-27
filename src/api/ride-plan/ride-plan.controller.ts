import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRidePlanDto, UpdateRidePlanDto } from './ride-plan.dto';
import { RidePlanService } from './ride-plan.service';

@Controller('ride-plan')
export class RidePlanController {
  constructor(private readonly ridePlanService: RidePlanService) { }

  @Post('create')
  create(@Body() createRidePlanDto: CreateRidePlanDto) {
    return this.ridePlanService.create(createRidePlanDto);
  }

  @Get()
  findAll() {
    return this.ridePlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridePlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRidePlanDto: UpdateRidePlanDto) {
    return this.ridePlanService.update(+id, updateRidePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ridePlanService.remove(+id);
  }
}
