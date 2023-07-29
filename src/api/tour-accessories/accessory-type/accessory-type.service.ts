import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccessoryTypeDto, UpdateAccessoryTypeDto } from './accessory-type.dto';
import { AccessoryType } from './accessory-type.entity';

@Injectable()
export class AccessoryTypeService {
  constructor(
    @InjectRepository(AccessoryType)
    private readonly accessoryTypeRepository: Repository<AccessoryType>,
  ) { }

  async create(createAccessoryTypeDto: CreateAccessoryTypeDto) {
    const accessoryType = this.accessoryTypeRepository.create(createAccessoryTypeDto);
    await this.accessoryTypeRepository.save(accessoryType);

    return {
      status: 201,
      message: 'Accesssory type created successfully',
      data: accessoryType,
    }
  }

  async findAll() {
    const acccessoryTypes = await this.accessoryTypeRepository.find();
    return {
      status: 200,
      message: 'Accessory types fetched successfully',
      data: acccessoryTypes,
    }
  }

  async findOne(id: number) {
    const findAcccessoryType = await this.accessoryTypeRepository.findOne({
      where: {
        id: id,
      }
    });

    if (!findAcccessoryType) {
      return {
        status: 404,
        message: 'Accessory type not found',
      }
    }
    return {
      status: 200,
      message: 'Accessory type fetched successfully',
      data: findAcccessoryType,
    }
  }

  async update(id: number, updateAccessoryTypeDto: UpdateAccessoryTypeDto) {
    const findAcccessoryType = await this.accessoryTypeRepository.findOne({
      where: {
        id: id,
      }
    });

    if (!findAcccessoryType) {
      return {
        status: 404,
        message: 'Accessory type not found',
      }
    }

    const updateAccessoryType = await this.accessoryTypeRepository.update(id, updateAccessoryTypeDto);

    return {
      status: 200,
      message: 'Accessory type updated successfully',
      data: updateAccessoryType,
    }
  }

  async remove(id: number) {
    const findaccessoryType = await this.accessoryTypeRepository.findOne({
      where: { id: id },
      relations: ['accessory']
    });

    if (!findaccessoryType) {
      return {
        status: 404,
        message: 'Accessory type not found',
      }
    }

    if (findaccessoryType.accessory.length > 0) {
      return {
        status: 400,
        message: 'Accessory type has been used!',
      }
    }

    const deleteaccessoryType = await this.accessoryTypeRepository.delete(id);

    return {
      status: 200,
      message: 'Accessory type deleted successfully',
      data: deleteaccessoryType,
    }
  }

  async findAccessoryTypeById(hotelId: number) {
    const accessoryType = await this.accessoryTypeRepository.findOne({
      where: {
        id: hotelId,
      }
    });

    if (accessoryType) {
      return accessoryType
    }

    return false;
  }
}
