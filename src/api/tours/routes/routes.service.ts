import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToursService } from '../tours.service';
import { CreateRouteDto, UpdateRouteDto } from './route.dto';
import { Routes } from './route.entity';

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

    const route = await this.routesRepository.save(newRoute);

    return {
      message: 'Route created successfully',
      data: route,
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

  async findOne(id: number) {
    const route = await this.routesRepository.findOne({ where: { id: id } });
    if (!route) {
      return {
        statusCode: 404,
        message: 'Route not found',
      }
    }

    return {
      message: 'Route found successfully',
      data: route,
      statusCode: 200
    }
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) {
    const route = await this.routesRepository.findOne({ where: { id: id } });
    if (!route) {
      return {
        statusCode: 404,
        message: 'Route not found',
      }
    }

    const updatedRoute = await this.routesRepository.save({
      ...route,
      ...updateRouteDto,
    });

    return {
      message: 'Route updated successfully',
      data: updatedRoute,
      statusCode: 200
    }
  }

  async remove(id: number) {
    const route = await this.routesRepository.findOne({ where: { id: id } });
    if (!route) {
      return {
        statusCode: 404,
        message: 'Route not found',
      }
    }

    await this.routesRepository.delete(id);

    return {
      message: 'Route deleted successfully',
      statusCode: 200,
    }
  }
}
