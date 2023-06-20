import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from '../cars/cars.module';
import { ToursModule } from '../tours/tours.module';
import { Reviews } from './review.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';


@Module({
  imports: [TypeOrmModule.forFeature([Reviews]), ToursModule, CarsModule],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})

export class ReviewsModule { }