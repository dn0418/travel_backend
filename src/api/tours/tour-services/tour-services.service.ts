import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToursService } from '../tours.service';
import { CreateTourServiceDto, UpdateTourServiceDto } from './tour-service.dto';
import { TourServices } from './tour-service.entity';

@Injectable()
export class TourServicesService {
  constructor(
    private readonly toursRepository: ToursService,

    @InjectRepository(TourServices)
    private readonly servicesRepository: Repository<TourServices>,
  ) { }

  async create(createTourServiceDto: CreateTourServiceDto) {
    const { tourId, ...newData } = createTourServiceDto;
    const tour = await this.toursRepository.getTourById(tourId);
    const newService = await this.servicesRepository.create(newData);
    newService.tour = tour;
    const service = await this.servicesRepository.save(newService);

    return {
      status: 201,
      message: 'Tour service created successfully',
      data: service,
    }
  }

  async findAll() {
    const services = await this.servicesRepository.find();
    return {
      status: 200,
      message: 'Tour services fetched successfully',
      data: services,
    }
  }

  async findOne(id: number) {
    const service = await this.servicesRepository.findOne({ where: { id: id } });
    if (!service) {
      return {
        status: 404,
        message: 'Tour service not found',
      }
    }

    return {
      status: 200,
      message: 'Tour service fetched successfully',
      data: service,
    }
  }

  async update(id: number, updateTourServiceDto: UpdateTourServiceDto) {
    const findService = await this.servicesRepository.findOne({ where: { id: id } });

    if (!findService) {
      return {
        status: 404,
        message: 'Tour service not found',
      }
    }

    const updatedService = await this.servicesRepository.save({
      ...findService,
      ...updateTourServiceDto,
    })

    return {
      status: 200,
      message: 'Tour service updated successfully',
      data: updatedService,
    }
  }


  async remove(id: number) {
    const findService = await this.servicesRepository.findOne({ where: { id: id } });

    if (!findService) {
      return {
        status: 404,
        message: 'Tour service not found',
      }
    }

    const deletedService = await this.servicesRepository.remove(findService);

    return {
      status: 200,
      message: 'Tour service deleted successfully',
      data: deletedService,
    }
  }
}
