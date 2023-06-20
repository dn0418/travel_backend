import { Injectable } from '@nestjs/common';
import { CreateImageDto, UpdateImageDto } from './images.dto';

@Injectable()
export class ImagesService {

  async create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  async findAll() {
    return `This action returns all images`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
