import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateThingToSeeDto, CreateToSeeImageDto, UpdateThingToSeeDto } from './thing-to-see.dto';
import { ThingToSee } from './thing-to-see.entity';

@Injectable()
export class ThingToSeeService {
  constructor(
    @InjectRepository(ThingToSee)
    private readonly thingToSeeRepository: Repository<ThingToSee>,
    private readonly imageRepository: ImagesService,
    @Inject(forwardRef(() => ReviewsService))
    private reviewRepository: ReviewsService,
  ) { }

  async create(createThingToSeeDto: CreateThingToSeeDto) {
    const { images, ...newData } = createThingToSeeDto;
    const newThingToSee = this.thingToSeeRepository.create(newData);
    const thingToSee = await this.thingToSeeRepository.save(newThingToSee);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addThingToSeeImage(image, thingToSee);
      })
    }

    return {
      status: 201,
      data: thingToSee,
      message: 'Thing to see created successfully'
    }
  }

  async createNewImage(newImage: CreateToSeeImageDto) {
    const { thingId, url } = newImage;
    const thingToDo = await this.thingToSeeRepository.findOne({
      where: { id: thingId },
    });
    if (!thingToDo) {
      return {
        status: 404,
        message: 'Thing to do not found'
      }
    }
    const image = await this.imageRepository.addThingToSeeImage(url, thingToDo);
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

    const [things, totalCount] = await this.thingToSeeRepository.findAndCount({
      where: conditions,
      skip,
      take: +limit,
      relations: ["reviews"],
    });

    const totalPages = Math.ceil(totalCount / +limit);

    // Calculate average rating for each hotel
    const thingsWithAvgRating = things.map((thing) => {
      const ratings = thing.reviews.map((review) => review.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return { ...thing, rating: averageRating };
    });

    return {
      status: 200,
      message: 'Things retrieved successfully',
      data: thingsWithAvgRating,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const thing = await this.thingToSeeRepository.findOne({
      where: { id: id },
      relations: ["reviews", "images"],
    });

    if (!thing) {
      return {
        status: 404,
        message: 'Thing to see not found'
      }
    }

    return {
      status: 200,
      data: thing
    }
  }

  async update(id: number, updateThingToSeeDto: UpdateThingToSeeDto) {
    const thingToSee = await this.thingToSeeRepository.findOne({ where: { id: id } });

    if (!thingToSee) {
      return {
        status: 404,
        message: 'Thing to see not found'
      }
    }

    const updatedThingToSee = await this.thingToSeeRepository.save({
      ...thingToSee,
      ...updateThingToSeeDto
    });

    return {
      status: 200,
      data: updatedThingToSee,
      message: 'Thing to see updated successfully'
    }
  }


  async remove(id: number) {
    const thingToSee = await this.thingToSeeRepository.findOne({
      where: { id: id },
      relations: ["reviews", "images"]
    });

    if (!thingToSee) {
      return {
        status: 404,
        message: 'Thing to see not found'
      }
    }

    if (thingToSee.images.length > 0) {
      await Promise.all(thingToSee.images.map(async (image) => {
        await this.imageRepository.remove(image.id);
      }));
    }

    if (thingToSee.reviews.length > 0) {
      await Promise.all(thingToSee.reviews.map(async (review) => {
        await this.reviewRepository.remove(review.id);
      }));
    }

    await this.thingToSeeRepository.remove(thingToSee);

    return {
      status: 200,
      message: 'Thing to see deleted successfully'
    }
  }

  async findById(id: number) {
    return this.thingToSeeRepository.findOne({ where: { id: id } })
  }
}
