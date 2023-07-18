import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { HotelTypeController } from './hotel-type/hotel-type.controller';
import { HotelType } from './hotel-type/hotel-type.entity';
import { HotelTypeService } from './hotel-type/hotel-type.service';
import { Hotels } from './hotel.entity';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { PricingTableController } from './pricing-table/pricing-table.controller';
import { PricingTable } from './pricing-table/pricing-table.entity';
import { PricingTableService } from './pricing-table/pricing-table.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotels, HotelType, PricingTable]),
    ImagesModule,
    forwardRef(() => ReviewsModule)
  ],
  controllers: [HotelsController, HotelTypeController, PricingTableController],
  providers: [HotelsService, HotelTypeService, PricingTableService],
  exports: [HotelsService]
})

export class HotelsModule { }
