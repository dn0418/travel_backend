import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAccessoriesPricingDto, UpdateAccessoriesPricingDto } from './accessories-pricing.dto';
import { AccessoriesPricingService } from './accessories-pricing.service';


@Controller('accessories-pricing')
export class AccessoriesPricingController {
  constructor(private readonly accessoriesPricingService: AccessoriesPricingService) { }

  @Post('create')
  create(@Body() createAccessoriesPricingDto: CreateAccessoriesPricingDto) {
    return this.accessoriesPricingService.create(createAccessoriesPricingDto);
  }

  @Get()
  findAll() {
    return this.accessoriesPricingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoriesPricingService.findOne(+id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAccessoriesPricingDto
  ) {
    return this.accessoriesPricingService.update(+id, updateDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.accessoriesPricingService.remove(+id);
  }
}
