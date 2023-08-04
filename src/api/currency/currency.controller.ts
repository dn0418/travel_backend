import { Body, Controller, Get, Put } from '@nestjs/common';
import { UpdateCurrencyDto } from './currency.dto';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) { }

  @Get()
  findAll() {
    return this.currencyService.findAll();
  }

  @Put('update')
  update(@Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyService.updateOrCreate(updateCurrencyDto);
  }
}
