import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateIndividualPricingDto, UpdateIndividualPricingDto } from './individual-pricing.dto';
import { IndividualPricingService } from './individual-pricing.service';

@Controller('individual-pricing')
export class IndividualPricingController {
  constructor(private readonly individualPricingService: IndividualPricingService) { }

  @Post('create')
  create(@Body() createIndividualPricingDto: CreateIndividualPricingDto) {
    return this.individualPricingService.create(createIndividualPricingDto);
  }

  @Get()
  findAll() {
    return this.individualPricingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.individualPricingService.findOne(+id);
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateIndividualPricingDto: UpdateIndividualPricingDto) {
    return this.individualPricingService.update(+id, updateIndividualPricingDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.individualPricingService.remove(+id);
  }
}
