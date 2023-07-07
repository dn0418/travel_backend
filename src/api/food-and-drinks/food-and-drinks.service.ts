import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { CreateFoodAndDrinkDto, UpdateFoodAndDrinkDto } from './food-and-drink.dto';
import { FoodAndDrink } from './food-and-drink.entity';

@Injectable()
export class FoodAndDrinksService {
  constructor(
    @InjectRepository(FoodAndDrink)
    private readonly foodDrinksRepository: Repository<FoodAndDrink>,
    private readonly imageRepository: ImagesService,
  ) { }


  async create(createFoodAndDrinksDto: CreateFoodAndDrinkDto) {
    const { images, ...newData } = createFoodAndDrinksDto;
    const newFoodAndDrinks = this.foodDrinksRepository.create(newData);
    const foodDrinks = await this.foodDrinksRepository.save(newFoodAndDrinks);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addFoodAndDrinksImage(image, foodDrinks);
      })
    }

    return {
      statusCode: 201,
      data: foodDrinks,
      message: 'Food and Drinks created successfully'
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

    const [foodAndDrinks, totalCount] = await this.foodDrinksRepository.findAndCount({
      where: conditions,
      skip,
      take: +limit,
      relations: ["reviews"],
    });

    const totalPages = Math.ceil(totalCount / +limit);

    // Calculate average rating for each hotel
    const foodAndDrinksWithAvgRating = foodAndDrinks.map((thing) => {
      const ratings = thing.reviews.map((review) => review.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return { ...thing, rating: averageRating };
    });

    return {
      statusCode: 200,
      message: 'Food and Drinks retrieved successfully',
      data: foodAndDrinksWithAvgRating,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const foodAndDrink = await this.foodDrinksRepository.findOne({
      where: { id: id },
      relations: ["reviews", "images"],
    });

    if (!foodAndDrink) {
      return {
        statusCode: 404,
        message: 'Food and Drinks not found'
      }
    }

    return {
      statusCode: 200,
      data: foodAndDrink
    }
  }

  async update(id: number, updateFoodAndDrinksDto: UpdateFoodAndDrinkDto) {
    const foodAndDrink = await this.foodDrinksRepository.findOne({ where: { id: id } });

    if (!foodAndDrink) {
      return {
        statusCode: 404,
        message: 'Food and Drinks not found'
      }
    }

    const updatedFoodAndDrinks = await this.foodDrinksRepository.save({
      ...foodAndDrink,
      ...updateFoodAndDrinksDto
    });

    return {
      statusCode: 200,
      data: updatedFoodAndDrinks,
      message: 'Food and Drinks updated successfully'
    }
  }


  async remove(id: number) {
    const foodAndDrink = await this.foodDrinksRepository.findOne({ where: { id: id } });

    if (!foodAndDrink) {
      return {
        statusCode: 404,
        message: 'Food and Drinks not found'
      }
    }

    await this.foodDrinksRepository.delete(id);

    return {
      statusCode: 200,
      message: 'Food and Drinks deleted successfully'
    }
  }

  async findById(id: number) {
    return this.foodDrinksRepository.findOne({ where: { id: id } })
  }
}
