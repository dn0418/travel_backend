import { Injectable } from '@nestjs/common';
import { CreateRouteDto, UpdateRouteDto } from './routes.dto';

@Injectable()
export class RoutesService {
  create(createRouteDto: CreateRouteDto) {
    return 'This action adds a new route';
  }

  findAll() {
    return `This action returns all routes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
