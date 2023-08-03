import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { MiceController } from './mice.controller';
import { Mice } from './mice.entity';
import { MiceService } from './mice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mice]),
    ImagesModule,
    forwardRef(() => ReviewsModule)
  ],
  controllers: [MiceController],
  providers: [MiceService],
  exports: [MiceService]
})
export class MiceModule { }
