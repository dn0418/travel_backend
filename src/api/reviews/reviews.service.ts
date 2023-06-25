import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarsService } from '../cars/cars.service';
import { HotelsService } from '../hotels/hotels.service';
import { ToursService } from '../tours/tours.service';
import { Reviews } from './review.entity';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';


@Injectable()
export class ReviewsService {
  constructor(
    private readonly toursRepository: ToursService,
    private readonly carsRepository: CarsService,
    private readonly hotelRepository: HotelsService,

    @InjectRepository(Reviews)
    private readonly reviewsRepository: Repository<Reviews>,
  ) { }

  async create(createReviewDto: CreateReviewDto) {
    const { tourId, carId, hotelId, ...reviews } = createReviewDto;

    let relations = {}

    if (tourId) {
      const findTour = await this.toursRepository.findOne(tourId);
      if (!findTour) {
        return {
          statusCode: 404,
          message: 'Tour not found',
        }
      }
      relations['tour'] = findTour.data;
    } else if (carId) {
      const findCar = await this.carsRepository.findOneByID(carId);
      if (!findCar) {
        return {
          statusCode: 404,
          message: 'Car not found',
        }
      }
      relations['car'] = findCar;
    } else if (hotelId) {
      const findHotel = await this.hotelRepository.findOneById(hotelId);
      if (!findHotel) {
        return {
          statusCode: 404,
          message: 'Hotel not found',
        }
      }
      relations['hotel'] = findHotel;
    }

    const newReview = this.reviewsRepository.create({
      ...reviews,
      ...relations,
    });

    const review = await this.reviewsRepository.save(newReview);

    return {
      message: 'Review created successfully',
      data: review,
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await this.reviewsRepository.findAndCount({
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      message: 'Reviews found successfully',
      data: reviews,
      statusCode: 200,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findTourReviews(tourId: number) {
    const reviews = await this.reviewsRepository.find({
      where: {
        tour: {
          id: tourId
        }
      }
    });

    return {
      message: 'Reviews found successfully',
      data: reviews,
      statusCode: 200,
    };
  }

  async findCarReviews(carId: number) {
    const reviews = await this.reviewsRepository.find({
      where: {
        car: {
          id: carId
        }
      }
    });

    return {
      message: 'Reviews found successfully',
      data: reviews,
      statusCode: 200,
    };
  }

  async findHotelReviews(hotelId: number) {
    const reviews = await this.reviewsRepository.find({
      where: {
        hotel: {
          id: hotelId
        }
      }
    });

    return {
      message: 'Reviews found successfully',
      data: reviews,
      statusCode: 200,
    };
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
