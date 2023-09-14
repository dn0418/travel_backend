import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateVacancyDto, UpdateVacancyDto } from './vacancy.dto';
import { Vacancy } from './vacancy.entity';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(Vacancy)
    private readonly vacancyRepository: Repository<Vacancy>,
  ) { }

  async create(createVacancyDto: CreateVacancyDto) {
    const newVacancy = this.vacancyRepository.create(createVacancyDto);
    const vacancy = await this.vacancyRepository.save(newVacancy);

    return {
      status: 201,
      message: 'Vacancy created successfully',
      data: vacancy,
    }
  }

  async findAll(
    page: number,
    limit: number,
    searchQuery: string,
    language: string
  ) {
    let conditions = {}

    if (language && language === 'ru') {
      conditions = { ...conditions, isRu: true }
    } else if (language && language === 'hy') {
      conditions = { ...conditions, isHy: true }
    }

    if (searchQuery) {
      conditions = {
        ...conditions,
        title: Like(`%${searchQuery}%`),
      };
    };
    const skip = (+page - 1) * +limit;

    const [vacancies, totalCount] = await this.vacancyRepository.findAndCount({
      where: conditions,
      skip,
      take: +limit,
      order: {
        createdAt: 'DESC',
      }
    });

    const totalPages = Math.ceil(totalCount / +limit);

    return {
      status: 200,
      message: 'Vacancies retrieved successfully',
      data: vacancies,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const vacancy = await this.vacancyRepository.findOne({ where: { id: id } });

    if (!vacancy) {
      return {
        status: 404,
        message: 'Vacancy not found',
      }
    }

    return {
      status: 200,
      message: 'Vacancy found successfully',
      data: vacancy,
    }
  }

  async update(id: number, updateVacancyDto: UpdateVacancyDto) {
    const findVacancy = await this.vacancyRepository.findOne({ where: { id: id } });
    if (!findVacancy) {
      return {
        status: 404,
        message: 'Vacancy not found',
      }
    };

    const updatedVacancy = await this.vacancyRepository.update(id, updateVacancyDto);

    return {
      status: 200,
      message: 'Vacancy updated successfully',
      data: updatedVacancy,
    }
  }

  async remove(id: number) {
    const findVacancy = await this.vacancyRepository.findOne({ where: { id: id } });
    if (!findVacancy) {
      return {
        status: 404,
        message: 'Vacancy not found',
      }
    };

    const removedVacancy = await this.vacancyRepository.delete(id);

    return {
      status: 200,
      message: 'Vacancy removed successfully',
      data: removedVacancy,
    }
  }
}
