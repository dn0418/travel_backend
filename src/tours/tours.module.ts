import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviews } from './reviews/review.entity';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';
import { Routes } from './routes/route.entity';
import { RoutesController } from './routes/routes.controller';
import { RoutesService } from './routes/routes.service';
import { Tours } from './tour.entity';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tours, Reviews, Routes]),
  ],
  controllers: [
    ToursController,
    ReviewsController,
    RoutesController
  ],
  providers: [
    ToursService,
    ReviewsService,
    RoutesService
  ],
  exports: [ToursService],
})
export class ToursModule { }
