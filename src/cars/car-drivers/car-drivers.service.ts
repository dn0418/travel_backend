import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDriverDto, UpdateCarDriverDto } from './car-driver.dto';
import { CarDriver } from './car-driver.entity';

@Injectable()
export class CarDriversService {
  constructor(
    @InjectRepository(CarDriver)
    private readonly carDriverRepository: Repository<CarDriver>,
  ) { }


  async create(createCarDriverDto: CreateCarDriverDto) {
    const newDriver = await this.carDriverRepository.create(createCarDriverDto);
    await this.carDriverRepository.save(newDriver);

    return {
      statusCode: 201,
      message: "Driver created successfully",
      data: newDriver,
    };

  }

  async findAll() {
    const carDrivers = await this.carDriverRepository.find();
    return {
      statusCode: 200,
      message: "All drivers",
      data: carDrivers,
    }
  }

  async findOne(id: number) {
    const carDriver = await this.carDriverRepository.findOne({ where: { id } });

    if (!carDriver) {
      return {
        statusCode: 404,
        message: "Driver not found",
      }
    }

    return {
      statusCode: 200,
      data: carDriver,
    }
  }


  async update(id: number, updateCarDriverDto: UpdateCarDriverDto) {
    const driver = await this.carDriverRepository.findOne({ where: { id } });
    if (driver) {
      await this.carDriverRepository.update(id, updateCarDriverDto);
      return {
        statusCode: 200,
        message: "Driver updated successfully",
      }
    }
    return {
      statusCode: 404,
      message: "Driver not found",
    }

  }

  async remove(id: number) {
    const driver = await this.carDriverRepository.findOne({ where: { id } });
    if (driver) {
      await this.carDriverRepository.delete(id);
      return {
        statusCode: 200,
        message: "Driver deleted successfully",
      }
    }
    return {
      statusCode: 404,
      message: "Driver not found",
    }
  }
}
