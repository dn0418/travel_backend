import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePricingWithoutDriverDto, UpdatePricingWithoutDriverDto } from './pricing-without-driver.dto';
import { PricingWithoutDriver } from './pricing-without-driver.entity';

@Injectable()
export class PricingWithoutDriverService {
  constructor(
    @InjectRepository(PricingWithoutDriver)
    private readonly withoutDriverRepository: Repository<PricingWithoutDriver>,
  ) { }

  async create(createDto: CreatePricingWithoutDriverDto) {
    const pricingWithoutDriver = this.withoutDriverRepository.create(createDto);
    await this.withoutDriverRepository.save(pricingWithoutDriver);

    return {
      message: 'Pricing without driver created successfully',
      data: pricingWithoutDriver,
      statusCode: 201

    }
  }

  async updateCarInPricing(id: number, car) {
    const pricingWithoutDriver = await this.withoutDriverRepository.findOne(
      { where: { id: id } }
    );
    pricingWithoutDriver.car = car;
    await this.withoutDriverRepository.save(pricingWithoutDriver);

    return {
      message: 'Pricing without driver updated successfully',
      data: pricingWithoutDriver,
      statusCode: 201

    }
  }

  async findAll() {
    const pricingWithoutDrivers = await this.withoutDriverRepository.find();

    return {
      message: 'Pricing without drivers fetched successfully',
      data: pricingWithoutDrivers,
      statusCode: 200
    }
  }

  async findOne(id: number) {
    const pricingWithoutDriver = await this.withoutDriverRepository.findOne(
      { where: { id: id } }
    );

    return {
      message: 'Pricing without driver fetched successfully',
      data: pricingWithoutDriver,
      statusCode: 200
    }
  }

  async update(id: number, updatePricingWithoutDriverDto: UpdatePricingWithoutDriverDto) {
    const pricingWithoutDriver = await this.withoutDriverRepository.findOne(
      { where: { id: id } }
    );

    await this.withoutDriverRepository.save({
      ...pricingWithoutDriver,
      ...updatePricingWithoutDriverDto
    });

    return {
      message: 'Pricing without driver updated successfully',
      data: pricingWithoutDriver,
      statusCode: 201

    }
  }

  async remove(id: number) {
    const pricingWithoutDriver = await this.withoutDriverRepository.findOne(
      { where: { id: id } }
    );

    await this.withoutDriverRepository.remove(pricingWithoutDriver);

    return {
      message: 'Pricing without driver deleted successfully',
      data: pricingWithoutDriver,
      statusCode: 200

    }
  }
}
