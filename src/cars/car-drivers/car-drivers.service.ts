import { Injectable } from '@nestjs/common';
import { CreateCarDriverDto, UpdateCarDriverDto } from './car-driver.dto';

@Injectable()
export class CarDriversService {
  create(createCarDriverDto: CreateCarDriverDto) {
    return 'This action adds a new carDriver';
  }

  findAll() {
    return `This action returns all carDrivers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carDriver`;
  }

  update(id: number, updateCarDriverDto: UpdateCarDriverDto) {
    return `This action updates a #${id} carDriver`;
  }

  remove(id: number) {
    return `This action removes a #${id} carDriver`;
  }
}
