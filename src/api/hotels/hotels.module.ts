import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { Hotels } from './hotel.entity';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotels]),
    ImagesModule
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
  exports: [HotelsService]
})

export class HotelsModule { }
