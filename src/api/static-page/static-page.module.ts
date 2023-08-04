import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticPageController } from './static-page.controller';
import { StaticPage } from './static-page.entity';
import { StaticPageService } from './static-page.service';

@Module({
  imports: [TypeOrmModule.forFeature([StaticPage])],
  controllers: [StaticPageController],
  providers: [StaticPageService]
})
export class StaticPageModule { }
