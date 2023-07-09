import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { Car } from './car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { PricingWithoutDriverController } from './pricing-without-driver/pricing-without-driver.controller';
import { PricingWithoutDriver } from './pricing-without-driver/pricing-without-driver.entity';
import { PricingWithoutDriverService } from './pricing-without-driver/pricing-without-driver.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, PricingWithoutDriver]),
    ImagesModule
  ],
  controllers: [CarsController, PricingWithoutDriverController],
  providers: [CarsService, PricingWithoutDriverService],
  exports: [CarsService]
})
export class CarsModule { }
