import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePricingWithDriverDto, UpdatePricingWithDriverDto } from './pricing-with-driver.dto';
import { PricingWithDriverService } from './pricing-with-driver.service';

@Controller('pricing-with-driver')
export class PricingWithDriverController {
  constructor(private readonly pricingWithDriverService: PricingWithDriverService) { }

  @Post()
  create(@Body() createPricingWithDriverDto: CreatePricingWithDriverDto) {
    return this.pricingWithDriverService.create(createPricingWithDriverDto);
  }

  @Get()
  findAll() {
    return this.pricingWithDriverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingWithDriverService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePricingWithDriverDto: UpdatePricingWithDriverDto) {
    return this.pricingWithDriverService.update(+id, updatePricingWithDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricingWithDriverService.remove(+id);
  }
}
