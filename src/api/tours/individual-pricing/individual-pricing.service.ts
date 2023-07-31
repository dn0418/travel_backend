import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToursService } from '../tours.service';
import {
  CreateIndividualPricingDto,
  UpdateIndividualPricingDto
} from './individual-pricing.dto';
import { IndividualPricing } from './individual-pricing.entity';

@Injectable()
export class IndividualPricingService {
  constructor(
    private readonly toursRepository: ToursService,

    @InjectRepository(IndividualPricing)
    private readonly individualRepository: Repository<IndividualPricing>,
  ) { }

  async create(createIndividualPricingDto: CreateIndividualPricingDto) {
    const { tourId, ...newData } = createIndividualPricingDto;
    const newPrice = this.individualRepository.create(newData);
    const tour = await this.toursRepository.getTourById(tourId);
    newPrice.tour = tour;
    const individualPricing = await this.individualRepository.save(newPrice);

    return {
      status: 201,
      message: 'Created individual pricing',
      data: individualPricing,
    }
  }

  async findAll() {
    const individualPricings = await this.individualRepository.find({
      relations: ['tour'],
    });

    return {
      status: 200,
      message: 'Found individual pricing',
      data: individualPricings,
    }
  }

  async findOne(id: number) {
    const individualPricing = await this.individualRepository.findOne({
      where: { id: id },
      relations: ['tour'],
    });

    if (!individualPricing) {
      return {
        status: 404,
        message: 'Not found individual pricing',
      }
    }

    return {
      status: 200,
      message: 'Found individual pricing',
      data: individualPricing,
    }
  }

  async update(id: number, updateIndividualPricingDto: UpdateIndividualPricingDto) {

    const individualPricing = await this.individualRepository.findOne({
      where: { id: id },
    });

    if (!individualPricing) {
      return {
        status: 404,
        message: 'Not found individual pricing',
      }
    }

    const updatedIndividualPricing = await this.individualRepository.save({
      ...individualPricing,
      ...updateIndividualPricingDto,
    });

    return {
      status: 200,
      message: 'Updated individual pricing',
      data: updatedIndividualPricing,
    }
  }

  async remove(id: number) {
    const individualPricing = await this.individualRepository.findOne({
      where: { id: id },
    });

    if (!individualPricing) {
      return {
        status: 404,
        message: 'Not found individual pricing',
      }
    }

    await this.individualRepository.remove(individualPricing);

    return {
      status: 200,
      message: 'Deleted individual pricing',
      data: individualPricing,
    }
  }
}
