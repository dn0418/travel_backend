import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToursService } from 'src/tours/tours.service';
import { Repository } from 'typeorm';
import { Routes } from './route.entity';
import { CreateRouteDto } from './routes.dto';

@Injectable()
export class RoutesService {
  constructor(
    private readonly toursRepository: ToursService,

    @InjectRepository(Routes)
    private readonly routesRepository: Repository<Routes>,
  ) { }

  async create(createRouteDto: CreateRouteDto) {
    const { tourId, ...reviews } = createRouteDto;

    const findTour = await this.toursRepository.findOne(tourId);

    if (!findTour) {
      return {
        statusCode: 404,
        message: 'Tour not found',
      }
    }

    const newRoute = this.routesRepository.create({
      ...reviews,
      tour: findTour.data,
    });

    const review = await this.routesRepository.save(newRoute);

    return {
      message: 'Route created successfully',
      data: review,
    }
  }

  async findAll() {
    const routes = await this.routesRepository.find();
    return {
      message: 'Route found successfully',
      data: routes,
      statusCode: 200
    }
  }
}
