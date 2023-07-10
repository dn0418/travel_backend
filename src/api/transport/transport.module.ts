import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { PricingWithDriver } from './with-driver/pricing-with-driver.entity';
import { WithDriverController } from './with-driver/with-driver.controller';
import { WithDriver } from './with-driver/with-driver.entity';
import { WithDriverService } from './with-driver/with-driver.service';
import { PricingWithoutDriver } from './without-driver/pricing-without-driver.entity';
import { CarsController } from './without-driver/without-driver.controller';
import { Car } from './without-driver/without-driver.entity';
import { CarsService } from './without-driver/without-driver.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
      PricingWithoutDriver,
      PricingWithDriver,
      WithDriver
    ]),
    ImagesModule,
  ],
  controllers: [CarsController, WithDriverController],
  providers: [CarsService, WithDriverService],
  exports: [CarsService]
})
export class TransportModule { }
