import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTourAccessoryDto, UpdateTourAccessoryDto } from './tour-accessory.dto';
import { TourAccessory } from './tour-accessory.entity';

@Injectable()
export class TourAccessoriesService {
  constructor(
    @InjectRepository(TourAccessory)
    private readonly tourAccessoryRepository: Repository<TourAccessory>,
  ) { }

  async create(createTourAccessoryDto: CreateTourAccessoryDto) {
    return 'This action adds a new tourAccessory';
  }

  async findAll() {
    return `This action returns all tourAccessories`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} tourAccessory`;
  }

  async update(id: number, updateTourAccessoryDto: UpdateTourAccessoryDto) {
    return `This action updates a #${id} tourAccessory`;
  }

  async remove(id: number) {
    return `This action removes a #${id} tourAccessory`;
  }
}
