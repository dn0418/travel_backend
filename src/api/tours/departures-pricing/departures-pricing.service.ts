import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToursService } from '../tours.service';
import { CreateDeparturesPricingDto, UpdateDeparturesPricingDto } from './departures-pricing.dto';
import { DeparturesPricing } from './departures-pricing.entity';

@Injectable()
export class DeparturesPricingService {
  constructor(
    private readonly toursRepository: ToursService,

    @InjectRepository(DeparturesPricing)
    private readonly departureRepository: Repository<DeparturesPricing>,
  ) { }

  async create(createDeparturesPricingDto: CreateDeparturesPricingDto) {
    const { tourId, ...newData } = createDeparturesPricingDto;
    const newDeparture = this.departureRepository.create(newData);
    const tour = await this.toursRepository.getTourById(tourId);
    newDeparture.tour = tour;
    const departure = await this.departureRepository.save(newDeparture);

    return {
      statusCode: 201,
      message: 'Departure created successfully',
      data: departure,
    }
  }

  async findAll() {
    const departures = await this.departureRepository.find();

    return {
      statusCode: 200,
      message: 'Departures fetched successfully',
      data: departures,
    }
  }

  async findOne(id: number) {
    const departure = await this.departureRepository.findOne({ where: { id: id } });

    if (!departure) {
      return {
        statusCode: 404,
        message: 'Departure not found',
      }
    }

    return {
      statusCode: 200,
      message: 'Departure fetched successfully',
      data: departure,
    }
  }

  async update(id: number, updatePricingDto: UpdateDeparturesPricingDto) {
    const findDeparture = await this.departureRepository.findOne({
      where: { id: id }
    });

    if (!findDeparture) {
      return {
        statusCode: 404,
        message: 'Departure not found',
      }
    }

    const updatedDeparture = await this.departureRepository.save({
      ...findDeparture,
      ...updatePricingDto,
    });

    return {
      statusCode: 200,
      message: 'Departure updated successfully',
      data: updatedDeparture,
    }

  }

  async remove(id: number) {
    const departure = await this.departureRepository.findOne({ where: { id: id } });

    if (!departure) {
      return {
        statusCode: 404,
        message: 'Departure not found',
      }
    }

    await this.departureRepository.delete(id);

    return {
      statusCode: 200,
      message: 'Departure deleted successfully',
      data: departure,
    }
  }
}
