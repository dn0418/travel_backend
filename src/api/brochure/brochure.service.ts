import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBrochureDto, UpdateBrochureDto } from './brochure.dto';
import { Brochure } from './brochure.entity';

@Injectable()
export class BrochureService {
  constructor(
    @InjectRepository(Brochure)
    private readonly brochureService: Repository<Brochure>,
  ) { }

  async create(createBrochureDto: CreateBrochureDto) {
    const newBrochure = this.brochureService.create(createBrochureDto);
    const brochure = await this.brochureService.save(newBrochure);

    return {
      status: 201,
      message: 'Brochure created successfully',
      data: brochure
    }
  }

  async findAll(
    page: number,
    searchQuery: string,
    language: string
  ) {
    let conditions = {}


    if (language && language === 'ru') {
      conditions = { ...conditions, isRu: true }
    } else if (language && language === 'hy') {
      conditions = { ...conditions, isHy: true }
    }

    if (searchQuery) {
      conditions = {
        ...conditions,
        title: Like(`%${searchQuery}%`),
      };
    };
    const skip = (+page - 1) * 10;

    const [brochures, totalCount] = await this.brochureService.findAndCount({
      where: conditions,
      skip,
      take: 10,
      order: {
        createdAt: 'DESC',
      }
    });

    const totalPages = Math.ceil(totalCount / 10);

    return {
      status: 200,
      message: 'Brochures retrieved successfully',
      data: brochures,
      meta: {
        page,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const brochure = await this.brochureService.findOne({ where: { id: id } });

    if (!brochure) {
      return {
        status: 404,
        message: 'Brochure not found!'
      }
    }

    return {
      status: 200,
      message: 'Brochure',
      data: brochure
    }
  }

  async update(id: number, updateBrochureDto: UpdateBrochureDto) {
    const findBrochure = await this.brochureService.findOne({ where: { id: id } });
    if (!findBrochure) {
      return {
        status: 404,
        message: 'Brochure not found!'
      }
    };

    const updatedBrochure = await this.brochureService.save({
      ...findBrochure,
      ...updateBrochureDto
    });

    return {
      status: 200,
      message: 'Brochure updated successfully',
      data: updatedBrochure
    }
  }

  async remove(id: number) {
    const findBrochure = await this.brochureService.findOne({ where: { id: id } });
    if (!findBrochure) {
      return {
        status: 404,
        message: 'Brochure not found!'
      }
    };

    await this.brochureService.delete(id);

    return {
      status: 200,
      message: 'Brochure deleted successfully'
    }
  }
}
