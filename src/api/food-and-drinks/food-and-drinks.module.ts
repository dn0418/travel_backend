import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodAndDrink } from './food-and-drink.entity';
import { FoodAndDrinksController } from './food-and-drinks.controller';
import { FoodAndDrinksService } from './food-and-drinks.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodAndDrink])],
  controllers: [FoodAndDrinksController],
  providers: [FoodAndDrinksService]
})
export class FoodAndDrinksModule { }
