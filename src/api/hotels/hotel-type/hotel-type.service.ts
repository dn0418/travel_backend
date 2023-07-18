import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelTypeDto, UpdateHotelTypeDto } from './hotel-type.dto';
import { HotelType } from './hotel-type.entity';

@Injectable()
export class HotelTypeService {
  constructor(
    @InjectRepository(HotelType)
    private readonly hotelTypeRepository: Repository<HotelType>,
  ) { }

  async create(createHotelTypeDto: CreateHotelTypeDto) {
    const hotelType = await this.hotelTypeRepository.create(createHotelTypeDto);
    this.hotelTypeRepository.save(hotelType);

    return {
      statusCode: 201,
      message: 'Hotel type created successfully',
      data: hotelType,
    }
  }

  async findAll() {
    const hotelTypes = await this.hotelTypeRepository.find();
    return {
      statusCode: 200,
      message: 'Hotel types fetched successfully',
      data: hotelTypes,
    }
  }

  async findOne(id: number) {
    const findHotelType = await this.hotelTypeRepository.findOne({
      where: {
        id: id,
      }
    });

    if (!findHotelType) {
      return {
        statusCode: 404,
        message: 'Hotel type not found',
      }
    }
    return {
      statusCode: 200,
      message: 'Hotel type fetched successfully',
      data: findHotelType,
    }
  }

  async update(id: number, updateHotelTypeDto: UpdateHotelTypeDto) {
    const findHotelType = await this.hotelTypeRepository.findOne({
      where: {
        id: id,
      }
    });

    if (!findHotelType) {
      return {
        statusCode: 404,
        message: 'Hotel type not found',
      }
    }

    const updateHotelType = await this.hotelTypeRepository.update(id, updateHotelTypeDto);

    return {
      statusCode: 200,
      message: 'Hotel type updated successfully',
      data: updateHotelType,
    }
  }

  async remove(id: number) {
    const findHotelType = await this.hotelTypeRepository.findOne({
      where: { id: id },
      relations: ['hotel']
    });

    if (!findHotelType) {
      return {
        statusCode: 404,
        message: 'Hotel type not found',
      }
    }

    if (findHotelType.hotel.length > 0) {
      return {
        statusCode: 400,
        message: 'Hotel type is in use',
      }
    }

    const deleteHotelType = await this.hotelTypeRepository.delete(id);

    return {
      statusCode: 200,
      message: 'Hotel type deleted successfully',
      data: deleteHotelType,
    }
  }

  async findHotelTypeByHotelId(hotelId: number) {
    const hotelType = await this.hotelTypeRepository.findOne({
      where: {
        id: hotelId,
      }
    });

    if (hotelType) {
      return hotelType
    }

    return false;
  }
}
