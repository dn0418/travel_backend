import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToursService } from 'src/tours/tours.service';
import { Repository } from 'typeorm';
import { Reviews } from './review.entity';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';


@Injectable()
export class ReviewsService {
  constructor(
    private readonly toursRepository: ToursService,

    @InjectRepository(Reviews)
    private readonly reviewsRepository: Repository<Reviews>,
  ) { }

  async create(createReviewDto: CreateReviewDto) {
    const { tourId, ...reviews } = createReviewDto;

    const findTour = await this.toursRepository.findOne(tourId);

    if (!findTour) {
      return {
        statusCode: 404,
        message: 'Tour not found',
      }
    }

    const newReview = this.reviewsRepository.create({
      ...reviews,
      tour: findTour.data,
    });

    const review = await this.reviewsRepository.save(newReview);

    return {
      message: 'Review created successfully',
      data: review,
    }
  }

  async findAll() {
    const reviews = await this.reviewsRepository.find();
    return {
      message: 'Reviews found successfully',
      data: reviews,
      statusCode: 200
    }
  }


  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
