import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursModule } from 'src/tours/tours.module';
import { Routes } from './route.entity';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Routes]), ToursModule],
  controllers: [RoutesController],
  providers: [RoutesService]
})

export class RoutesModule { }
