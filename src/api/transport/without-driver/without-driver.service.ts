import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewsService } from 'src/api/reviews/reviews.service';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../../images/images.service';
import { PricingWithoutDriver } from './pricing-without-driver.entity';
import {
  CreateCarDto,
  CreateImageDto,
  CreatePricingWithoutDriverDto,
  UpdateCarDto,
  UpdatePricingWithoutDriverDto
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

    @Inject(forwardRef(() => ReviewsService))
    private reviewRepository: ReviewsService,
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
      status: 201,
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
        status: 404,
        message: 'Car not found',
      }
    }

    const newPricing = this.pricingRepository.create(newData);
    newPricing.car = car;
    await this.pricingRepository.save(newPricing);

    return {
      status: 201,
      message: 'Pricing without driver created successfully',
      data: newPricing,
    }
  }

  async updatePricing(id: number, priceDto: UpdatePricingWithoutDriverDto) {
    console.log(id)
    const findPrice = await this.pricingRepository.findOne({ where: { id } });
    if (!findPrice) {
      return {
        status: 400,
        message: 'Pricing with driver not found',
      }
    }
    const updatedPricing = await this.pricingRepository.save({
      ...findPrice,
      ...priceDto,
    });
    return {
      status: 200,
      message: 'Pricing with driver updated successfully',
      data: updatedPricing,
    }
  }


  async createNewImage(imageDto: CreateImageDto) {
    const { carId, url } = imageDto;
    const findCar = await this.carRepository.findOne({ where: { id: carId } });
    if (!findCar) {
      return {
        status: 404,
        message: 'Car not found',
      }
    }
    const newImage = await this.imageRepository.addCarImage(url, findCar);

    return {
      status: 201,
      message: 'Image created successfully',
      data: newImage
    }
  }


  async deletePrice(id: number) {
    const findPrice = await this.pricingRepository.findOne({ where: { id } });
    if (!findPrice) {
      return {
        status: 400,
        message: 'Pricing with driver not found',
      }
    }

    await this.pricingRepository.delete(id);

    return {
      status: 200,
      message: 'Pricing with driver deleted successfully',
    }
  }

  async findAll(page: number, limit: number, searchQuery?: string, language?: string) {
    let conditions = {}

    if (language && language === 'ru') {
      conditions = { ...conditions, isRu: true }
    } else if (language && language === 'hy') {
      conditions = { ...conditions, isHy: true }
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
      status: 200,
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

  async findRealated() {
    const hotels = await this.carRepository.find({
      take: 10,
      order: {
        score: "DESC"
      }
    });

    return {
      data: hotels,
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
        status: 200,
        message: 'Car retrieved successfully',
        data: {
          ...car,
          totalReview,
          rating: reviewAverage,
        },
      }
    }
    return {
      status: 400,
      message: 'Car not found',
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const findCar = await this.carRepository.findOne({ where: { id } });
    if (!findCar) {
      return {
        status: 400,
        message: 'Car not found',
      }
    }

    const updateCar = await this.carRepository.save({
      ...findCar,
      ...updateCarDto,
    });

    return {
      status: 200,
      message: 'Car updated successfully',
      data: updateCar,
    }
  }

  async remove(id: number) {
    const findCar = await this.carRepository.findOne({
      where: { id },
      relations: ["priceWithoutDriver", "images", "reviews"]
    });

    if (!findCar) {
      return {
        status: 400,
        message: 'Car not found',
      }
    }

    if (findCar.priceWithoutDriver.length > 0) {
      await Promise.all(findCar.priceWithoutDriver.map(async (price) => {
        await this.pricingRepository.delete(price.id);
      }));
    }

    if (findCar.images.length > 0) {
      await Promise.all(findCar.images.map(async (image) => {
        await this.imageRepository.remove(image.id);
      }));
    }

    if (findCar.reviews.length > 0) {
      await Promise.all(findCar.reviews.map(async (review) => {
        await this.reviewRepository.remove(review.id);
      }));
    }

    await this.carRepository.remove(findCar);

    return {
      status: 200,
      message: 'Car deleted successfully',
    }
  }

  async findOneByID(id: number) {
    const car = await this.carRepository.findOne({ where: { id } });
    return car;
  }
}
