import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCurrencyDto } from './currency.dto';
import { Currency } from './currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) { }

  async findAll() {
    const currency = await this.currencyRepository.find();
    return {
      status: 200,
      data: currency,
      message: 'Currency retrieved successfully!'
    }
  }

  async updateOrCreate(updateCurrencyDto: UpdateCurrencyDto) {
    const find = await this.currencyRepository.findOne({
      where: {
        code: updateCurrencyDto.code,
      }
    });

    if (find) {
      const update = await this.currencyRepository.save({
        ...find,
        ...updateCurrencyDto
      });
      return {
        status: 200,
        data: update,
        message: 'Currency updated successfully!'
      }
    }
    const newCurrency = this.currencyRepository.create(updateCurrencyDto);
    const currency = await this.currencyRepository.save(newCurrency);

    return {
      status: 201,
      data: currency,
      message: 'Currency created successfully!'
    }
  }
}
