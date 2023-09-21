import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePricingTableDto, UpdatePricingTableDto } from './pricing-table.dto';
import { PricingTableService } from './pricing-table.service';
import { PricingTableHeaderService } from './pricing-table-header.service';
import { CreatePricingTableHeaderDto, UpdatePricingTableHeaderDto } from './pricing-table-header.dto';

@Controller('hotels/price-table-header')
export class PricingTableHeaderController {
  constructor(private pricingTableHeaderService: PricingTableHeaderService) { }

  @Get("all")
  findAllData() {
    return this.pricingTableHeaderService.findAllHeaders();
  }
  
  @Post('create')
  create(@Body() data: CreatePricingTableHeaderDto) {
    return this.pricingTableHeaderService.create(data);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updatePricingTableHeaderData: UpdatePricingTableHeaderDto) {
    return this.pricingTableHeaderService.update(+id, updatePricingTableHeaderData);
  }
  
  @Get(':id')
  find(@Param('id') id: number){
    return this.pricingTableHeaderService.findOne(id)
  }

 

  // @Delete('delete/:id')
  // remove(@Param('id') id: string) {
  //   return this.pricingTableHeaderService.remove(+id);
  // }
}
