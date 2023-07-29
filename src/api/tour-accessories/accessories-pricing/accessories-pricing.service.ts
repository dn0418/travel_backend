import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccessoriesPricingDto, UpdateAccessoriesPricingDto } from './accessories-pricing.dto';
import { AccessoriesPricing } from './accessories-pricing.entity';

@Injectable()
export class AccessoriesPricingService {
  constructor(
    @InjectRepository(AccessoriesPricing)
    private readonly pricingRepository: Repository<AccessoriesPricing>,
  ) { }

  async create(createAccessoriesPricingDto: CreateAccessoriesPricingDto) {
    const { accessoriesId, ...pricingData } = createAccessoriesPricingDto;
    const newPricing = this.pricingRepository.create({
      ...pricingData,
      accessory: { id: accessoriesId }
    });

    const pricing = await this.pricingRepository.save(newPricing);
    return {
      status: 201,
      message: 'Accessories Pricing Created Successfully',
      data: pricing,
    }
  }


  async createWithAccessories(PricingDto, accessory) {
    const newPricing = this.pricingRepository.create({
      ...PricingDto,
      accessory: accessory,
    });
    return this.pricingRepository.save(newPricing);
  }

  async findAll() {
    const pricing = await this.pricingRepository.find({ relations: ['accessory'] });
    return {
      status: 200,
      message: 'Accessories Pricing Fetched Successfully',
      data: pricing,
    }
  }

  async findOne(id: number) {
    const pricing = await this.pricingRepository.findOne({
      where: { id: id }, relations: ['accessory']
    });

    if (!pricing) {
      return {
        status: 404,
        message: 'Accessories Pricing Not Found',
      }
    }

    return {
      status: 200,
      message: 'Accessories Pricing Fetched Successfully',
      data: pricing,
    }
  }

  async update(id: number, updatePricingDto: UpdateAccessoriesPricingDto) {
    const pricing = await this.pricingRepository.findOne({ where: { id: id } });
    if (!pricing) {
      return {
        status: 404,
        message: 'Accessories Pricing Not Found',
      }
    }
    const updatedPricing = await this.pricingRepository.save({
      ...pricing,
      ...updatePricingDto,
    });

    return {
      status: 200,
      message: 'Accessories Pricing Updated Successfully',
      data: updatedPricing,
    }
  }

  async remove(id: number) {
    const pricing = await this.pricingRepository.findOne({ where: { id: id } });
    if (!pricing) {
      return {
        status: 404,
        message: 'Accessories Pricing Not Found',
      }
    }
    await this.pricingRepository.remove(pricing);

    return {
      status: 200,
      message: 'Accessories Pricing Deleted Successfully',
    }
  }
}
