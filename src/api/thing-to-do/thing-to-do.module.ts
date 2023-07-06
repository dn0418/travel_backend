import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThingToDoController } from './thing-to-do.controller';
import { ThingToDo } from './thing-to-do.entity';
import { ThingToDoService } from './thing-to-do.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThingToDo])],
  controllers: [ThingToDoController],
  providers: [ThingToDoService]
})
export class ThingToDoModule { }
