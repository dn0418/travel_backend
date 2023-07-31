import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelsService } from '../hotels.service';
import { CreatePricingTableDto, UpdatePricingTableDto } from './pricing-table.dto';
import { PricingTable } from './pricing-table.entity';

@Injectable()
export class PricingTableService {
  constructor(
    @InjectRepository(PricingTable)
    private readonly pricingRepository: Repository<PricingTable>,

    private readonly hotelRepository: HotelsService,
  ) { }

  async create(createPricingTableDto: CreatePricingTableDto) {
    const { hotelId, ...newData } = createPricingTableDto;
    const hotel = await this.hotelRepository.findOneById(hotelId);
    const newPricingTable = this.pricingRepository.create({ ...newData, hotel: hotel });
    const price = await this.pricingRepository.save(newPricingTable);

    return {
      status: 201,
      message: 'Pricing table created successfully',
      data: price
    }
  }


  async findAll() {
    const prices = await this.pricingRepository.find();

    return {
      status: 200,
      message: 'Pricing table list',
      data: prices
    }
  }

  async findOne(id: number) {
    const price = await this.pricingRepository.findOne({ where: { id: id } });

    if (!price) {
      return {
        status: 404,
        message: 'Pricing table not found',
        data: null
      }
    }

    return {
      status: 200,
      message: 'Pricing table',
      data: price
    }
  }

  async update(id: number, updatePricingTableDto: UpdatePricingTableDto) {
    const findPrice = await this.pricingRepository.findOne({ where: { id: id } });
    if (!findPrice) {
      return {
        status: 404,
        message: 'Pricing table not found',
      }
    }
    const updatedPrice = await this.pricingRepository.save({
      ...findPrice,
      ...updatePricingTableDto
    });

    return {
      status: 200,
      message: 'Pricing table updated successfully',
      data: updatedPrice
    }
  }

  async remove(id: number) {
    const findPrice = await this.pricingRepository.findOne({ where: { id: id } });
    if (!findPrice) {
      return {
        status: 404,
        message: 'Pricing table not found',
      }
    }
    const deletedPrice = await this.pricingRepository.delete(id);

    return {
      status: 200,
      message: 'Pricing table deleted successfully',
      data: deletedPrice
    }
  }
}
