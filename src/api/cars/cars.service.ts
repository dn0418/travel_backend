import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto, UpdateCarDto } from './cars.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) { }

  async create(createCarDto: CreateCarDto) {
    const car = this.carRepository.create(createCarDto);
    await this.carRepository.save(car);

    return {
      statusCode: 201,
      message: 'Car created successfully',
      data: car,
    }
  }

  async findAll(page: number, limit: number, driver: string, searchQuery?: string) {
    let conditions = {}

    if (driver === 'true') {
      conditions = { isDriver: true }
    } else if (driver === 'false') {
      conditions = { isDriver: false }
    }

    if (searchQuery) {
      conditions = {
        ...conditions,
        name: Like(`%${searchQuery}%`),
      };
    }

    const skip = (page - 1) * limit;
    const [cars, totalCount] = await this.carRepository.findAndCount({
      where: conditions,
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      statusCode: 200,
      message: 'Cars retrieved successfully',
      data: cars,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    };
  }


  async findOne(id: number) {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['reviews']
    });

    if (car) {
      const totalReview = car.reviews.length;
      const reviewTotal = car.reviews.reduce((sum, review) => sum + review.rating, 0);
      const reviewAverage = totalReview > 0 ? reviewTotal / totalReview : 0;

      return {
        statusCode: 200,
        message: 'Car retrieved successfully',
        data: {
          ...car,
          totalReview,
          rating: reviewAverage,
        },
      }
    }
    return {
      statusCode: 400,
      message: 'Car not found',
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  async remove(id: number) {
    const car = await this.carRepository.findOne({ where: { id } });
    if (car) {
      await this.carRepository.delete(id);
      return {
        statusCode: 200,
        message: 'Car deleted successfully',
      }
    }

    return {
      statusCode: 400,
      message: 'Car not found',
    }
  }

  async findOneByID(id: number) {
    const car = await this.carRepository.findOne({ where: { id } });
    return car;
  }
}
