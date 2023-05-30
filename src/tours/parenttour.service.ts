import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ParentTour } from './parenttour.entity';

@Injectable()
export class ParentTourService {
  constructor(
    @Inject('PARENTTOUR_REPOSITORY')
    private photoRepository: Repository<ParentTour>,
  ) {}

  async findAll(): Promise<ParentTour[]> {
    return this.photoRepository.find();
  }
}