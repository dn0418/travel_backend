import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Destinations } from './destinations/destination.entity';
import { DestinationsController } from './destinations/destinations.controller';
import { DestinationsService } from './destinations/destinations.service';
import { Routes } from './routes/route.entity';
import { RoutesController } from './routes/routes.controller';
import { RoutesService } from './routes/routes.service';
import { TourServicesController } from './tour-services/tour-services.controller';
import { TourServicesService } from './tour-services/tour-services.service';
import { TourTypeController } from './tour-type/tour-type.controller';
import { TourType } from './tour-type/tour-type.entity';
import { TourTypeService } from './tour-type/tour-type.service';
import { Tours } from './tour.entity';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tours, Routes, TourType, Destinations]),
  ],
  controllers: [
    ToursController,
    RoutesController,
    TourServicesController,
    TourTypeController,
    DestinationsController
  ],
  providers: [
    ToursService,
    RoutesService,
    TourServicesService,
    TourTypeService,
    DestinationsService
  ],
  exports: [ToursService],
})
export class ToursModule { }
