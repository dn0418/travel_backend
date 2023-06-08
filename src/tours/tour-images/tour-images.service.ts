import { Injectable } from '@nestjs/common';
import { CreateTourImageDto, UpdateTourImageDto } from './tour-images.dto';


@Injectable()
export class TourImagesService {
  create(createTourImageDto: CreateTourImageDto) {
    return 'This action adds a new tourImage';
  }

  findAll() {
    return `This action returns all tourImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tourImage`;
  }

  update(id: number, updateTourImageDto: UpdateTourImageDto) {
    return `This action updates a #${id} tourImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} tourImage`;
  }
}
