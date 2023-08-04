import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateStaticPageDto } from './static-page.dto';
import { StaticPage } from './static-page.entity';

@Injectable()
export class StaticPageService {
  constructor(
    @InjectRepository(StaticPage)
    private readonly pageRepository: Repository<StaticPage>,
  ) { }

  async findAll() {
    const pages = await this.pageRepository.find();

    return {
      status: 200,
      data: pages,
    }
  }

  async findOne(id: number) {
    const page = await this.pageRepository.findOne({ where: { id: id } });
    if (!page) {
      throw new NotFoundException('Page not found!');
    }

    return {
      status: 200,
      data: page,
    }
  }

  async updateOrCreate(updatePageDto: UpdateStaticPageDto) {
    const findPage = await this.pageRepository.findOne({
      where: {
        code: updatePageDto.code,
      }
    });

    if (findPage) {
      const update = await this.pageRepository.save({
        ...findPage,
        ...updatePageDto
      });

      return {
        status: 200,
        data: update,
        message: 'Page updated successfully!'
      }
    }

    const newPage = this.pageRepository.create(updatePageDto);
    const page = await this.pageRepository.save(newPage);

    return {
      status: 201,
      data: page,
      message: 'Page created successfully!'
    }
  }
}
