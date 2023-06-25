import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessoryType } from './accessory-type/accessory-type.entity';
import { TourAccessoriesController } from './tour-accessories.controller';
import { TourAccessoriesService } from './tour-accessories.service';
import { TourAccessory } from './tour-accessory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TourAccessory, AccessoryType]),
  ],
  controllers: [TourAccessoriesController],
  providers: [TourAccessoriesService],
  exports: [TourAccessoriesService]
})
export class TourAccessoriesModule { }
