import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideDestination } from './entity/ride-destination.entity';
import { RidePlan } from './entity/ride-plan.entity';
import { RidePlanController } from './ride-plan.controller';
import { RidePlanService } from './ride-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([RidePlan, RideDestination])],
  controllers: [RidePlanController],
  providers: [RidePlanService],
})
export class RidePlanModule { }
