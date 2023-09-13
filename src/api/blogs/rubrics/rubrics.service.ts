import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRubricDto, UpdateRubricDto } from './rubric.dto';
import { Rubric } from './rubric.entity';

@Injectable()
export class RubricsService {
  constructor(
    @InjectRepository(Rubric)
    private readonly rubricRepository: Repository<Rubric>,
  ) { }

  async create(createRubricDto: CreateRubricDto) {
    const newRubric = this.rubricRepository.create(createRubricDto);
    const rubric = await this.rubricRepository.save(newRubric);

    return {
      status: 201,
      message: 'Rubric created successfully',
      data: rubric
    }
  }

  async findAll() {
    const rubrics = await this.rubricRepository.find();

    return {
      status: 200,
      message: 'All rubrics fetched successfully',
      data: rubrics
    }
  }

  async findOne(id: number) {
    const rubric = await this.rubricRepository.findOne({
      where: { id: id }
    });

    return {
      status: 200,
      message: 'Rubric fetched successfully',
      data: rubric
    }
  }

  async update(id: number, updateRubricDto: UpdateRubricDto) {
    const findRubric = await this.rubricRepository.findOne({
      where: { id: id }
    });

    if (!findRubric) {
      return {
        status: 404,
        message: 'Rubric not found'
      }
    }

    const updated = await this.rubricRepository.save({
      ...findRubric,
      ...updateRubricDto
    });

    return {
      status: 200,
      message: 'Rubric updated successfully',
      data: updated
    }
  }

  async remove(id: number) {
    const findRubric = await this.rubricRepository.findOne({
      where: { id: id }
    });

    if (!findRubric) {
      return {
        status: 404,
        message: 'Rubric not found'
      }
    }

    const deleted = await this.rubricRepository.delete(id);

    return {
      status: 200,
      message: 'Rubric deleted successfully',
      data: deleted
    }
  }
}
