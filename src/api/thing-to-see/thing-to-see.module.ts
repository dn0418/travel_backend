import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { ThingToSeeController } from './thing-to-see.controller';
import { ThingToSee } from './thing-to-see.entity';
import { ThingToSeeService } from './thing-to-see.service';

@Module({
  imports: [TypeOrmModule.forFeature([ThingToSee]),
    ImagesModule,
  forwardRef(() => ReviewsModule)
  ],
  controllers: [ThingToSeeController],
  providers: [ThingToSeeService],
  exports: [ThingToSeeService]
})
export class ThingToSeeModule { }
