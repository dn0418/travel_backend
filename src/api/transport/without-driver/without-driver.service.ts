import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../../images/images.service';
import { PricingWithoutDriver } from '../pricing-without-driver/pricing-without-driver.entity';
import {
  CreateCarDto,
  CreatePricingWithoutDriverDto,
  UpdateCarDto
} from './without-driver.dto';
import { Car } from './without-driver.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(PricingWithoutDriver)
    private readonly pricingRepository: Repository<PricingWithoutDriver>,

    private readonly imageRepository: ImagesService,
  ) { }

  async create(createCarDto: CreateCarDto) {
    const { pricing, images, ...newData } = createCarDto;
    const newCar = this.carRepository.create(newData);
    const car = await this.carRepository.save(newCar);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addCarImage(image, car);
      })
    }

    if (pricing.length > 0) {
      pricing.forEach(async (pricing) => {
        const newPricing = this.pricingRepository.create({
          ...pricing,
          car: car,
        });
        await this.pricingRepository.save(newPricing);
      });
    }

    return {
      statusCode: 201,
      message: 'Car created successfully',
      data: car,
    }
  }

  async createNewPrice(createDto: CreatePricingWithoutDriverDto) {
    const { carId, ...newData } = createDto;
    const car = await this.carRepository.findOne({
      where: { id: carId }
    });

    if (!car) {
      return {
        statusCode: 404,
        message: 'Car not found',
      }
    }

    const newPricing = this.pricingRepository.create(newData);
    newPricing.car = car;
    await this.pricingRepository.save(newPricing);

    return {
      statusCode: 201,
      message: 'Pricing without driver created successfully',
      data: newPricing,
    }
  }

  async findAll(page: number, limit: number, searchQuery?: string) {
    let conditions = {}

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
      relations: ['reviews']
    });

    const totalPages = Math.ceil(totalCount / +limit);

    // Calculate average rating for each hotel
    const carsWithAvgRating = cars.map((car) => {
      const ratings = car.reviews.map((review) => review.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return { ...car, rating: averageRating };
    });

    return {
      statusCode: 200,
      message: 'Cars retrieved successfully',
      data: carsWithAvgRating,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['reviews', "priceWithoutDriver", "images"]
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
    const findCar = await this.carRepository.findOne({ where: { id } });
    if (!findCar) {
      return {
        statusCode: 400,
        message: 'Car not found',
      }
    }

    const updateCar = await this.carRepository.save({
      ...findCar,
      ...updateCarDto,
    });

    return {
      statusCode: 200,
      message: 'Car updated successfully',
      data: updateCar,
    }
  }

  async remove(id: number) {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ["priceWithoutDriver"]
    });

    if (car) {
      if (car.priceWithoutDriver.length > 0) {
        car.priceWithoutDriver.forEach(async (price) => {
          await this.pricingRepository.delete(price.id);
        })
      }

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
