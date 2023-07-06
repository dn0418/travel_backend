import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoodAndDrinkDto, UpdateFoodAndDrinkDto } from './food-and-drink.dto';
import { FoodAndDrink } from './food-and-drink.entity';

@Injectable()
export class FoodAndDrinksService {
  constructor(
    @InjectRepository(FoodAndDrink)
    private readonly foodDrinksRepository: Repository<FoodAndDrink>,
  ) { }

  async create(createFoodAndDrinkDto: CreateFoodAndDrinkDto) {
    return 'This action adds a new foodAndDrink';
  }

  async findAll() {
    return `This action returns all foodAndDrinks`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} foodAndDrink`;
  }

  async update(id: number, updateFoodAndDrinkDto: UpdateFoodAndDrinkDto) {
    return `This action updates a #${id} foodAndDrink`;
  }

  async remove(id: number) {
    return `This action removes a #${id} foodAndDrink`;
  }
}
