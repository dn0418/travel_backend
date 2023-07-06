import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThingToDoDto, UpdateThingToDoDto } from './thing-to-do.dto';
import { ThingToDo } from './thing-to-do.entity';

@Injectable()
export class ThingToDoService {
  constructor(
    @InjectRepository(ThingToDo)
    private readonly thingToDoRepository: Repository<ThingToDo>,
  ) { }

  async create(createThingToDoDto: CreateThingToDoDto) {
    return 'This action adds a new thingToDo';
  }

  async findAll() {
    return `This action returns all thingToDo`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} thingToDo`;
  }

  async update(id: number, updateThingToDoDto: UpdateThingToDoDto) {
    return `This action updates a #${id} thingToDo`;
  }

  async remove(id: number) {
    return `This action removes a #${id} thingToDo`;
  }
}
