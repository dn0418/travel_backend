import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePricingTableDto, UpdatePricingTableDto } from './pricing-table.dto';
import { PricingTableService } from './pricing-table.service';

@Controller('pricing-table')
export class PricingTableController {
  constructor(private readonly pricingTableService: PricingTableService) { }

  @Post('create')
  create(@Body() createPricingTableDto: CreatePricingTableDto) {
    return this.pricingTableService.create(createPricingTableDto);
  }

  @Get()
  findAll() {
    return this.pricingTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricingTableService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updatePricingTableDto: UpdatePricingTableDto) {
    return this.pricingTableService.update(+id, updatePricingTableDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.pricingTableService.remove(+id);
  }
}
