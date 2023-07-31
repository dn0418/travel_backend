import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateFoodAndDrinkDto, CreateFoodImageDto, UpdateFoodAndDrinkDto } from './food-and-drink.dto';
import { FoodAndDrink } from './food-and-drink.entity';

@Injectable()
export class FoodAndDrinksService {
  constructor(
    @InjectRepository(FoodAndDrink)
    private readonly foodDrinksRepository: Repository<FoodAndDrink>,
    private readonly imageRepository: ImagesService,

    @Inject(forwardRef(() => ReviewsService))
    private reviewRepository: ReviewsService,
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
      status: 201,
      data: foodDrinks,
      message: 'Food and Drinks created successfully'
    }
  }

  async createNewImage(newImage: CreateFoodImageDto) {
    const { foodId, url } = newImage;
    const thingToDo = await this.foodDrinksRepository.findOne({
      where: { id: foodId },
    });

    if (!thingToDo) {
      return {
        status: 404,
        message: 'Food and Drinks not found'
      }
    }
    const image = await this.imageRepository.addFoodAndDrinksImage(url, thingToDo);

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
      status: 200,
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
        status: 404,
        message: 'Food and Drinks not found'
      }
    }

    return {
      status: 200,
      data: foodAndDrink
    }
  }

  async update(id: number, updateFoodAndDrinksDto: UpdateFoodAndDrinkDto) {
    const foodAndDrink = await this.foodDrinksRepository.findOne({ where: { id: id } });

    if (!foodAndDrink) {
      return {
        status: 404,
        message: 'Food and Drinks not found'
      }
    }

    const updatedFoodAndDrinks = await this.foodDrinksRepository.save({
      ...foodAndDrink,
      ...updateFoodAndDrinksDto
    });

    return {
      status: 200,
      data: updatedFoodAndDrinks,
      message: 'Food and Drinks updated successfully'
    }
  }


  async remove(id: number) {
    const foodAndDrink = await this.foodDrinksRepository.findOne({
      where: { id: id },
      relations: ["reviews", "images"]
    });

    if (!foodAndDrink) {
      return {
        status: 404,
        message: 'Food and Drinks not found'
      };
    }

    if (foodAndDrink.images.length > 0) {
      await Promise.all(foodAndDrink.images.map(async (image) => {
        await this.imageRepository.remove(image.id);
      }));
    }

    if (foodAndDrink.reviews.length > 0) {
      await Promise.all(foodAndDrink.reviews.map(async (review) => {
        await this.reviewRepository.remove(review.id);
      }));
    }

    await this.foodDrinksRepository.remove(foodAndDrink);

    return {
      status: 200,
      message: 'Food and Drinks deleted successfully'
    };
  }

  async findById(id: number) {
    return this.foodDrinksRepository.findOne({ where: { id: id } })
  }
}
