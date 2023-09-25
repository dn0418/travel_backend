import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrochureController } from './brochure.controller';
import { Brochure } from './brochure.entity';
import { BrochureService } from './brochure.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brochure])],
  controllers: [BrochureController],
  providers: [BrochureService]
})
export class BrochureModule { }
