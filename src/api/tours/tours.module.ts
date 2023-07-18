import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { DeparturesPricingController } from './departures-pricing/departures-pricing.controller';
import { DeparturesPricing } from './departures-pricing/departures-pricing.entity';
import { DeparturesPricingService } from './departures-pricing/departures-pricing.service';
import { Destinations } from './destinations/destination.entity';
import { DestinationsController } from './destinations/destinations.controller';
import { DestinationsService } from './destinations/destinations.service';
import { IndividualPricingController } from './individual-pricing/individual-pricing.controller';
import { IndividualPricing } from './individual-pricing/individual-pricing.entity';
import { IndividualPricingService } from './individual-pricing/individual-pricing.service';
import { Routes } from './routes/route.entity';
import { RoutesController } from './routes/routes.controller';
import { RoutesService } from './routes/routes.service';
import { TourServices } from './tour-services/tour-service.entity';
import { TourServicesController } from './tour-services/tour-services.controller';
import { TourServicesService } from './tour-services/tour-services.service';
import { Tours } from './tour.entity';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tours,
      Routes,
      Destinations,
      IndividualPricing,
      DeparturesPricing,
      TourServices
    ]),
    ImagesModule,
    forwardRef(() => ReviewsModule)
  ],
  controllers: [
    ToursController,
    RoutesController,
    TourServicesController,
    DestinationsController,
    IndividualPricingController,
    DeparturesPricingController,
  ],
  providers: [
    ToursService,
    RoutesService,
    TourServicesService,
    DestinationsService,
    IndividualPricingService,
    DeparturesPricingService
  ],
  exports: [ToursService],
})
export class ToursModule { }
