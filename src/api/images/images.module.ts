import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToursModule } from '../tours/tours.module';
import { ImagesController } from './images.controller';
import { Images } from './images.entity';
import { ImagesService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Images]), ToursModule],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule { }
