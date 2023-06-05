import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourDto, UpdateTourDto } from './tour.dto';
import { Tours } from './tour.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tours)
    private readonly toursRepository: Repository<Tours>,
  ) { }


  // Create a new tour
  async create(createTourDto: CreateTourDto) {
    const newTour = await this.toursRepository.create(createTourDto);

    const tour = await this.toursRepository.save(newTour);

    if (tour) {
      return {
        statusCode: 201,
        message: 'Tour created successfully',
        data: tour,
      }
    }

    return {
      statusCode: 500,
      message: 'Something went wrong',
    }
  }

  // Find All Tours
  async findAll() {
    const tours = await this.toursRepository.find({ relations: ['reviews'] });
    return {
      statusCode: 200,
      data: tours
    };
  }

  // Find Tour By Id
  async findOne(id: number) {
    const tour = await this.toursRepository.findOne(
      { where: { id }, relations: ['reviews'] }
    );

    if (tour) {
      return {
        statusCode: 200,
        data: tour
      }
    }

    return {
      statusCode: 404,
      message: 'Tour not found'
    }
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
  }

  // Remove Tour By Id
  async remove(id: number) {
    const tour = await this.toursRepository.findOneById(id);

    if (tour) {
      await this.toursRepository.remove(tour);
      return {
        statusCode: 200,
        message: 'Tour deleted successfully'
      }
    }

    return {
      statusCode: 404,
      message: 'Tour not found'
    }
  }
}
