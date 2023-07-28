import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
  findAll(@Query('page') page?: string) {
    return this.ridePlanService.findAll(+page || 1);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridePlanService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateRidePlanDto: UpdateRidePlanDto) {
    return this.ridePlanService.update(+id, updateRidePlanDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.ridePlanService.remove(+id);
  }
}
