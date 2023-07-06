import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { CreateThingToSeeDto, UpdateThingToSeeDto } from './thing-to-see.dto';
import { ThingToSee } from './thing-to-see.entity';

@Injectable()
export class ThingToSeeService {
  constructor(
    @InjectRepository(ThingToSee)
    private readonly thingToSeeRepository: Repository<ThingToSee>,
    private readonly imageRepository: ImagesService,
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
      statusCode: 201,
      data: thingToSee,
      message: 'Thing to see created successfully'
    }
  }

  async findAll(
    type: string,
    page: number,
    limit: number,
    searchQuery: string
  ) {
    let conditions = {}

    if (type) {
      conditions = { ...conditions, type: type }
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
      statusCode: 200,
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
        statusCode: 404,
        message: 'Thing to see not found'
      }
    }

    return {
      statusCode: 200,
      data: thing
    }
  }

  async update(id: number, updateThingToSeeDto: UpdateThingToSeeDto) {
    const thingToSee = await this.thingToSeeRepository.findOne({ where: { id: id } });

    if (!thingToSee) {
      return {
        statusCode: 404,
        message: 'Thing to see not found'
      }
    }

    const updatedThingToSee = await this.thingToSeeRepository.save({
      ...thingToSee,
      ...updateThingToSeeDto
    });

    return {
      statusCode: 200,
      data: updatedThingToSee,
      message: 'Thing to see updated successfully'
    }
  }


  async remove(id: number) {
    const thingToSee = await this.thingToSeeRepository.findOne({ where: { id: id } });

    if (!thingToSee) {
      return {
        statusCode: 404,
        message: 'Thing to see not found'
      }
    }

    await this.thingToSeeRepository.delete(id);

    return {
      statusCode: 200,
      message: 'Thing to see deleted successfully'
    }
  }
}
