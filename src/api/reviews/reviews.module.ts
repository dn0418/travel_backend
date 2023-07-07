import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from '../cars/cars.module';
import { HotelsModule } from '../hotels/hotels.module';
import { ThingToDoModule } from '../thing-to-do/thing-to-do.module';
import { ThingToSeeModule } from '../thing-to-see/thing-to-see.module';
import { TourAccessoriesModule } from '../tour-accessories/tour-accessories.module';
import { ToursModule } from '../tours/tours.module';
import { Reviews } from './review.entity';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Reviews]),
    ToursModule,
    CarsModule,
    HotelsModule,
    TourAccessoriesModule,
    ThingToSeeModule,
    ThingToDoModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService]
})

export class ReviewsModule { }