import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateSurroundingDto, CreateSurroundingImageDto, UpdateSurroundingDto } from './surrounding.dto';
import { Surrounding } from './surrounding.entity';

@Injectable()
export class SurroundingService {
  constructor(
    @InjectRepository(Surrounding)
    private readonly surroundingRepository: Repository<Surrounding>,
    private readonly imageRepository: ImagesService,
    @Inject(forwardRef(() => ReviewsService))
    private reviewRepository: ReviewsService,
  ) { }

  async create(createSurroundingDto: CreateSurroundingDto) {
    const { images, ...newData } = createSurroundingDto;
    const newSurrounding = this.surroundingRepository.create(newData);
    const surrounding = await this.surroundingRepository.save(newSurrounding);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addSurroundingImage(image, surrounding);
      })
    }

    return {
      status: 201,
      data: surrounding,
      message: 'Surrounding created successfully'
    }
  }

  async createNewImage(newImage: CreateSurroundingImageDto) {
    const { surroundingId, url } = newImage;
    const surrounding = await this.surroundingRepository.findOne({
      where: { id: surroundingId },
    });
    if (!surrounding) {
      return {
        status: 404,
        message: 'Surrounding not found'
      }
    }
    const image = await this.imageRepository.addSurroundingImage(url, surrounding);
    return {
      status: 201,
      data: image,
      message: 'Image added successfully'
    }
  }

  async findAll(
    type: string,
    page: number,
    limit: number,
    searchQuery: string,
    language: string
  ) {
    let conditions = {}

    if (type) {
      conditions = { ...conditions, type: type }
    }

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
    };
    const skip = (+page - 1) * +limit;

    const [surroundings, totalCount] = await this.surroundingRepository.findAndCount({
      where: conditions,
      skip,
      take: +limit,
      relations: ["reviews"],
    });

    const totalPages = Math.ceil(totalCount / +limit);

    // Calculate average rating for each hotel
    const surroundingsWithAvgRating = surroundings.map((surrounding) => {
      const ratings = surrounding.reviews.map((review) => review.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return { ...surrounding, rating: averageRating };
    });

    return {
      status: 200,
      message: 'Surroundings retrieved successfully',
      data: surroundingsWithAvgRating,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const surrounding = await this.surroundingRepository.findOne({
      where: { id: id },
      relations: ["reviews", "images"],
    });

    if (!surrounding) {
      return {
        status: 404,
        message: 'Surrounding not found'
      }
    }

    return {
      status: 200,
      data: surrounding
    }
  }

  async update(id: number, updateSurroundingDto: UpdateSurroundingDto) {
    const surrounding = await this.surroundingRepository.findOne({ where: { id: id } });

    if (!surrounding) {
      return {
        status: 404,
        message: 'Surrounding not found'
      }
    }

    const updatedSurrounding = await this.surroundingRepository.save({
      ...surrounding,
      ...updateSurroundingDto
    });

    return {
      status: 200,
      data: updatedSurrounding,
      message: 'Surrounding updated successfully'
    }
  }


  async remove(id: number) {
    const surrounding = await this.surroundingRepository.findOne({
      where: { id: id },
      relations: ["reviews", "images"]
    });

    if (!surrounding) {
      return {
        status: 404,
        message: 'Surrounding not found'
      }
    }

    if (surrounding.images.length > 0) {
      await Promise.all(surrounding.images.map(async (image) => {
        await this.imageRepository.remove(image.id);
      }));
    }

    if (surrounding.reviews.length > 0) {
      await Promise.all(surrounding.reviews.map(async (review) => {
        await this.reviewRepository.remove(review.id);
      }));
    }

    await this.surroundingRepository.remove(surrounding);

    return {
      status: 200,
      message: 'Surrounding deleted successfully'
    }
  }

  async findById(id: number) {
    return this.surroundingRepository.findOne({ where: { id: id } })
  }
}
