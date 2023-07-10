import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNewPricingWithDriverDto, CreateWithDriverDto, UpdateWithDriverDto } from './with-driver.dto';
import { WithDriverService } from './with-driver.service';

@Controller('with-driver')
export class WithDriverController {
  constructor(private readonly withDriverService: WithDriverService) { }

  @Post()
  create(@Body() createWithDriverDto: CreateWithDriverDto) {
    return this.withDriverService.create(createWithDriverDto);
  }

  @Post('pricing/create')
  createNewPrice(@Body() createPriceDto: CreateNewPricingWithDriverDto) {
    return this.withDriverService.createNewPrice(createPriceDto);
  }

  @Get()
  findAll() {
    return this.withDriverService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWithDriverDto: UpdateWithDriverDto) {
    return this.withDriverService.update(+id, updateWithDriverDto);
  }
}
