import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { SurroundingController } from './surrounding.controller';
import { Surrounding } from './surrounding.entity';
import { SurroundingService } from './surrounding.service';

@Module({
  imports: [TypeOrmModule.forFeature([Surrounding]),
    ImagesModule,
  forwardRef(() => ReviewsModule)
  ],
  controllers: [SurroundingController],
  providers: [SurroundingService],
  exports: [SurroundingService],
})
export class SurroundingModule { }
