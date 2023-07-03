import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { AccessoriesPricingController } from './accessories-pricing/accessories-pricing.controller';
import { AccessoriesPricing } from './accessories-pricing/accessories-pricing.entity';
import { AccessoriesPricingService } from './accessories-pricing/accessories-pricing.service';
import { AccessoryTypeController } from './accessory-type/accessory-type.controller';
import { AccessoryType } from './accessory-type/accessory-type.entity';
import { AccessoryTypeService } from './accessory-type/accessory-type.service';
import { TourAccessoriesController } from './tour-accessories.controller';
import { TourAccessoriesService } from './tour-accessories.service';
import { TourAccessory } from './tour-accessory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [TourAccessory, AccessoryType, AccessoriesPricing]),
    ImagesModule,
  ],
  controllers: [
    TourAccessoriesController,
    AccessoryTypeController,
    AccessoriesPricingController],
  providers: [
    TourAccessoriesService,
    AccessoryTypeService,
    AccessoriesPricingService],
  exports: [TourAccessoriesService]
})
export class TourAccessoriesModule { }
