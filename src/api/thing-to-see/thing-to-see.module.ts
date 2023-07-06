import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { ThingToSeeController } from './thing-to-see.controller';
import { ThingToSee } from './thing-to-see.entity';
import { ThingToSeeService } from './thing-to-see.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThingToSee]), ImagesModule],
  controllers: [ThingToSeeController],
  providers: [ThingToSeeService]
})
export class ThingToSeeModule { }
