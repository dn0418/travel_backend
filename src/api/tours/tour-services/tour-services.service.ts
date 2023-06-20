import { Injectable } from '@nestjs/common';
import { CreateTourServiceDto, UpdateTourServiceDto } from './tour-service.dto';

@Injectable()
export class TourServicesService {
  create(createTourServiceDto: CreateTourServiceDto) {
    return 'This action adds a new tourService';
  }

  findAll() {
    return `This action returns all tourServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tourService`;
  }

  update(id: number, updateTourServiceDto: UpdateTourServiceDto) {
    return `This action updates a #${id} tourService`;
  }

  remove(id: number) {
    return `This action removes a #${id} tourService`;
  }
}
