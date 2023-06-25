import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { HotelTypeController } from './hotel-type/hotel-type.controller';
import { HotelType } from './hotel-type/hotel-type.entity';
import { HotelTypeService } from './hotel-type/hotel-type.service';
import { Hotels } from './hotel.entity';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotels, HotelType]),
    ImagesModule,
  ],
  controllers: [HotelsController, HotelTypeController],
  providers: [HotelsService, HotelTypeService],
  exports: [HotelsService]
})

export class HotelsModule { }
