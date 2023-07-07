import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { CreateThingToDoDto, UpdateThingToDoDto } from './thing-to-do.dto';
import { ThingToDo } from './thing-to-do.entity';

@Injectable()
export class ThingToDoService {
  constructor(
    @InjectRepository(ThingToDo)
    private readonly thingToDoRepository: Repository<ThingToDo>,
    private readonly imageRepository: ImagesService,
  ) { }

  async create(createThingToDoDto: CreateThingToDoDto) {
    const { images, ...newData } = createThingToDoDto;
    const newThingToDo = this.thingToDoRepository.create(newData);
    const thingToDo = await this.thingToDoRepository.save(newThingToDo);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addFoodAndDrinksImage(image, thingToDo);
      })
    }

    return {
      statusCode: 201,
      data: thingToDo,
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

    const [things, totalCount] = await this.thingToDoRepository.findAndCount({
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
    const thing = await this.thingToDoRepository.findOne({
      where: { id: id },
      relations: ["reviews", "images"],
    });

    if (!thing) {
      return {
        statusCode: 404,
        message: 'Thing to do not found'
      }
    }

    return {
      statusCode: 200,
      data: thing
    }
  }

  async update(id: number, updateThingToDoDto: UpdateThingToDoDto) {
    const thingToDo = await this.thingToDoRepository.findOne({ where: { id: id } });

    if (!thingToDo) {
      return {
        statusCode: 404,
        message: 'Thing to do not found'
      }
    }

    const updatedThingToDo = await this.thingToDoRepository.save({
      ...thingToDo,
      ...updateThingToDoDto
    });

    return {
      statusCode: 200,
      data: updatedThingToDo,
      message: 'Thing to do updated successfully'
    }
  }


  async remove(id: number) {
    const thingToDo = await this.thingToDoRepository.findOne({ where: { id: id } });

    if (!thingToDo) {
      return {
        statusCode: 404,
        message: 'Thing to do not found'
      }
    }

    await this.thingToDoRepository.delete(id);

    return {
      statusCode: 200,
      message: 'Thing to do deleted successfully'
    }
  }

  async findById(id: number) {
    return this.thingToDoRepository.findOne({ where: { id: id } })
  }
}
