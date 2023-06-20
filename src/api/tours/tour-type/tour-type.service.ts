import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourTypeDto, UpdateTourTypeDto } from './tour-type.dto';
import { TourType } from './tour-type.entity';

@Injectable()
export class TourTypeService {
  constructor(
    @InjectRepository(TourType)
    private readonly tourTypeRepository: Repository<TourType>,
  ) { }

  async create(createTourTypeDto: CreateTourTypeDto) {
    const tourType = this.tourTypeRepository.create(createTourTypeDto);
    await this.tourTypeRepository.save(tourType);

    return {
      statusCode: 201,
      message: "Tour type created successfully",
      data: tourType,
    }
  }

  async findAll() {
    const tourTypes = await this.tourTypeRepository.find();

    return {
      statuCode: 200,
      message: 'success',
      data: tourTypes,
    };
  }


  async findOne(id: number) {
    const tourType = await this.tourTypeRepository.findOne({ where: { id: id } });

    if (!tourType) {
      return {
        statuCode: 404,
        message: 'tour type not found',
        data: null,
      };

    }

    return {
      statuCode: 200,
      message: 'success',
      data: tourType,
    };

  }

  async update(id: number, updateTourTypeDto: UpdateTourTypeDto) {
    await this.tourTypeRepository.update(id, updateTourTypeDto);
    const tourType = await this.tourTypeRepository.findOne({ where: { id: id } });

    return {
      statusCode: 200,
      message: 'Tour type updated successfully',
      data: tourType,
    }
  }


  async remove(id: number) {
    const tourType = await this.tourTypeRepository.findOne({ where: { id: id } });
    if (!tourType) {
      return {
        statusCode: 404,
        message: 'tour type not found',
      }
    }
    await this.tourTypeRepository.delete(id);
    return {
      statusCode: 200,
      message: 'Tour type deleted successfully',
    }
  }
}
