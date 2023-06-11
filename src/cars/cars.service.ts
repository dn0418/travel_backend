import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarDriver } from './car-drivers/car-driver.entity';
import { Car } from './car.entity';
import { CreateCarDto, UpdateCarDto } from './cars.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarDriver)
    private readonly carDriverRepository: Repository<CarDriver>,

    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) { }

  async create(createCarDto: CreateCarDto) {
    if (createCarDto.isDriver) {
      const { driverId, ...createCarData } = createCarDto;
      if (!driverId) {
        return {
          statusCode: 400,
          message: 'Driver id is required',
        }
      }
      const carDriver = await this.carDriverRepository.findOne({ where: { id: driverId } });

      if (carDriver) {
        const car = this.carRepository.create({ ...createCarData });
        car.carDriver = carDriver;
        await this.carRepository.save(car);

        return {
          statusCode: 201,
          message: 'Car created successfully',
          data: car,
        }
      }

      return {
        statusCode: 400,
        message: 'Car driver not found',
      }
    } else {
      const car = this.carRepository.create(createCarDto);
      await this.carRepository.save(car);

      return {
        statusCode: 201,
        message: 'Car created successfully',
        data: car,
      }
    }
  }

  async findAll() {
    const cars = await this.carRepository.createQueryBuilder('car')
      .leftJoin('car.reviews', 'reviews')
      .leftJoin('car.carDriver', 'car_driver')
      .select([
        'car.*',
        'reviews.car',
        'car_driver.firstName as driverFirstName',
        'car_driver.lastName as driverLastName',
        'car_driver.licenseNo as driverLicenseNo',
        'AVG(reviews.rating) as rating',
        'COUNT(reviews.id) as reviewCount', // Average rating from reviews
      ])
      .groupBy('car.id')
      .getRawMany();

    return {
      statusCode: 200,
      message: 'Cars retrieved successfully',
      data: cars,
    }
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOne(
      { where: { id }, relations: ['carDriver', 'reviews'] });
    if (car) {
      return {
        statusCode: 200,
        message: 'Car retrieved successfully',
        data: car,
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
