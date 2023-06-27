import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideDestination } from './ride-destination.entity';
import { RidePlanController } from './ride-plan.controller';
import { RidePlan } from './ride-plan.entity';
import { RidePlanService } from './ride-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([RidePlan, RideDestination])],
  controllers: [RidePlanController],
  providers: [RidePlanService],
})
export class RidePlanModule { }
