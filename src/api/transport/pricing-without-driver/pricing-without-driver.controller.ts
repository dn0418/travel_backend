import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreatePricingWithoutDriverDto, UpdatePricingWithoutDriverDto } from './pricing-without-driver.dto';
import { PricingWithoutDriverService } from './pricing-without-driver.service';

@Controller('pricing-without-driver')
export class PricingWithoutDriverController {
  constructor(private readonly pricingWithoutDriverService: PricingWithoutDriverService) { }

  @Post('create')
  create(@Body() createPricingWithoutDriverDto: CreatePricingWithoutDriverDto) {
    return this.pricingWithoutDriverService.create(createPricingWithoutDriverDto);
  }

  @Get()
  findAll() {
    return this.pricingWithoutDriverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingWithoutDriverService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePricingWithoutDriverDto: UpdatePricingWithoutDriverDto) {
    return this.pricingWithoutDriverService.update(+id, updatePricingWithoutDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricingWithoutDriverService.remove(+id);
  }
}
