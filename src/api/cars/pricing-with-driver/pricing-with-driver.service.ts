import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePricingWithDriverDto, UpdatePricingWithDriverDto } from './pricing-with-driver.dto';
import { PricingWithDriver } from './pricing-with-driver.entity';

@Injectable()
export class PricingWithDriverService {
  constructor(
    @InjectRepository(PricingWithDriver)
    private readonly withDriverRepository: Repository<PricingWithDriver>,
  ) { }


  async create(createPricingDto: CreatePricingWithDriverDto) {
    const pricingWithDriver = this.withDriverRepository.create(createPricingDto);
    await this.withDriverRepository.save(pricingWithDriver);

    return {
      message: 'Pricing with driver created successfully',
      pricingWithDriver,
    };
  }

  async updateCarInPricing(id: number, car) {
    const pricingWithDriver = await this.withDriverRepository.findOne(
      { where: { id: id } }
    );

    pricingWithDriver.car = car;
    await this.withDriverRepository.save(pricingWithDriver);

    return {
      message: 'Pricing without driver updated successfully',
      data: pricingWithDriver,
      statusCode: 201

    }
  }

  async findAll() {
    const pricingWithDriver = await this.withDriverRepository.find();
    return {
      message: 'Pricing with driver found successfully',
      data: pricingWithDriver,
      statusCode: 200
    }
  }

  async findOne(id: number) {
    const pricingWithDriver = await this.withDriverRepository.findOne(
      { where: { id: id } }
    );
    return {
      message: 'Pricing with driver found successfully',
      data: pricingWithDriver,
      statusCode: 200
    }
  }

  async update(id: number, updatePricingWithDriverDto: UpdatePricingWithDriverDto) {
    const pricingWithDriver = await this.withDriverRepository.findOne(
      { where: { id: id } }
    );

    await this.withDriverRepository.save({
      ...pricingWithDriver,
      ...updatePricingWithDriverDto
    });

    return {
      message: 'Pricing with driver updated successfully',
      data: pricingWithDriver,
      statusCode: 201
    }

  }

  async remove(id: number) {
    const pricingWithDriver = await this.withDriverRepository.findOne(
      { where: { id: id } }
    );

    await this.withDriverRepository.remove(pricingWithDriver);

    return {
      message: 'Pricing with driver deleted successfully',
      data: pricingWithDriver,
      statusCode: 200
    }
  }
}
