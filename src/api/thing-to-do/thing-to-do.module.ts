import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { ThingToDoController } from './thing-to-do.controller';
import { ThingToDo } from './thing-to-do.entity';
import { ThingToDoService } from './thing-to-do.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThingToDo]), ImagesModule],
  controllers: [ThingToDoController],
  providers: [ThingToDoService],
  exports: [ThingToDoService],
})
export class ThingToDoModule { }
