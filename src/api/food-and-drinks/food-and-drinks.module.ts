import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { FoodAndDrink } from './food-and-drink.entity';
import { FoodAndDrinksController } from './food-and-drinks.controller';
import { FoodAndDrinksService } from './food-and-drinks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoodAndDrink]),
    ImagesModule,
    forwardRef(() => ReviewsModule)
  ],
  controllers: [FoodAndDrinksController],
  providers: [FoodAndDrinksService],
  exports: [FoodAndDrinksService],
})
export class FoodAndDrinksModule { }
