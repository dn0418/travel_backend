import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotels } from './hotel.entity';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hotels]),
  ],
  controllers: [HotelsController],
  providers: [HotelsService]
})
export class HotelsModule { }
