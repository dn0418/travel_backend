import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarDriver } from './car-drivers/car-driver.entity';
import { CarDriversController } from './car-drivers/car-drivers.controller';
import { CarDriversService } from './car-drivers/car-drivers.service';
import { Car } from './car.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, CarDriver]),
  ],
  controllers: [CarsController, CarDriversController],
  providers: [CarsService, CarDriversService],
  exports: [CarsService]
})
export class CarsModule { }
