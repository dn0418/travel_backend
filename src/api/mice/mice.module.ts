import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiceController } from './mice.controller';
import { Mice } from './mice.entity';
import { MiceService } from './mice.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mice])],
  controllers: [MiceController],
  providers: [MiceService]
})
export class MiceModule { }
