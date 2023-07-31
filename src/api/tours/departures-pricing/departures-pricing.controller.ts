import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateDeparturesPricingDto, UpdateDeparturesPricingDto } from './departures-pricing.dto';
import { DeparturesPricingService } from './departures-pricing.service';

@Controller('departures-pricing')
export class DeparturesPricingController {
  constructor(private readonly departuresPricingService: DeparturesPricingService) { }

  @Post('create')
  create(@Body() createDeparturesPricingDto: CreateDeparturesPricingDto) {
    return this.departuresPricingService.create(createDeparturesPricingDto);
  }

  @Get()
  findAll() {
    return this.departuresPricingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departuresPricingService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateDeparturesPricingDto: UpdateDeparturesPricingDto) {
    return this.departuresPricingService.update(+id, updateDeparturesPricingDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.departuresPricingService.remove(+id);
  }
}
