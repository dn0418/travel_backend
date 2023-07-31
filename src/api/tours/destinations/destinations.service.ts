import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDestinationDto, UpdateDestinationDto } from './destination.dto';
import { Destinations } from './destination.entity';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destinations)
    private readonly destinationsRepository: Repository<Destinations>,
  ) { }

  async create(createDestinationDto: CreateDestinationDto) {
    const newDestination = this.destinationsRepository.create(createDestinationDto);
    const destination = await this.destinationsRepository.save(newDestination);

    return {
      status: 201,
      message: 'Destination created successfully',
      data: destination
    }
  }

  // Get All destinations
  async findAll() {
    const destinations = await this.destinationsRepository.find();
    return {
      status: 200,
      data: destinations
    }
  }

  async findOne(id: number) {
    const destination = await this.destinationsRepository.findOne({
      where: { id: id },
    });

    if (!destination) {
      throw new Error('Destination not found by this ID');
    }

    return {
      status: 200,
      data: destination
    };
  }

  async update(id: number, updateDestinationDto: UpdateDestinationDto) {
    const destination = await this.destinationsRepository.findOne({
      where: { id: id },
    });

    if (!destination) {
      return {
        status: 404,
        message: 'Destination not found by this ID',
      }
    }

    await this.destinationsRepository.update(id, updateDestinationDto);

    return {
      status: 200,
      message: 'Destination updated successfully',
    }
  }

  async remove(id: number) {
    const destination = await this.destinationsRepository.findOne({
      where: { id: id },
      relations: ['tour']
    });

    if (!destination) {
      return {
        status: 404,
        message: 'Destination not found by this ID',
      }
    }

    if (destination.tour.length > 0) {
      return {
        status: 400,
        message: 'Destination has tours, can not be delete!',
      }
    }

    await this.destinationsRepository.remove(destination);

    return {
      message: 'Destination deleted successfully',
    }
  }

  async findDestinationById(id: number) {
    return this.destinationsRepository.findOne({ where: { id: id } })
  }
}
