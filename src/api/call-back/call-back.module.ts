import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallBackController } from './call-back.controller';
import { CallBack } from './call-back.entity';
import { CallBackService } from './call-back.service';

@Module({
  imports: [TypeOrmModule.forFeature([CallBack])],
  controllers: [CallBackController],
  providers: [CallBackService]
})
export class CallBackModule { }
