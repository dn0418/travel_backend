import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallBackModule } from './api/call-back/call-back.module';
import { FileModule } from './api/file/file.module';
import { FoodAndDrinksModule } from './api/food-and-drinks/food-and-drinks.module';
import { HotelsModule } from './api/hotels/hotels.module';
import { ImagesModule } from './api/images/images.module';
import { MiceModule } from './api/mice/mice.module';
import { ReviewsModule } from './api/reviews/reviews.module';
import { RidePlanModule } from './api/ride-plan/ride-plan.module';
import { ThingToDoModule } from './api/thing-to-do/thing-to-do.module';
import { ThingToSeeModule } from './api/thing-to-see/thing-to-see.module';
import { TourAccessoriesModule } from './api/tour-accessories/tour-accessories.module';
import { ToursModule } from './api/tours/tours.module';
import { TransportModule } from './api/transport/transport.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/db.config';
import { MailModule } from './api/mail/mail.module';
import mailConfig from './config/email.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConfig),
    ToursModule,
    ReviewsModule,
    ImagesModule,
    HotelsModule,
    FileModule,
    TourAccessoriesModule,
    RidePlanModule,
    CallBackModule,
    ThingToDoModule,
    ThingToSeeModule,
    FoodAndDrinksModule,
    TransportModule,
    MiceModule,
    MailerModule.forRoot(mailConfig),
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }