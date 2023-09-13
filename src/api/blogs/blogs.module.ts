import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { Rubric } from './rubrics/rubric.entity';
import { RubricsController } from './rubrics/rubrics.controller';
import { RubricsService } from './rubrics/rubrics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rubric, Blog])],
  controllers: [BlogsController, RubricsController],
  providers: [BlogsService, RubricsService]
})
export class BlogsModule { }
