import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { EventsController } from './events.controller';
import { Events } from './events.entity';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Events]),
    ImagesModule
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule { }
