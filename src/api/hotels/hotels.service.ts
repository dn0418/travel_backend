import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { HotelTypeService } from './hotel-type/hotel-type.service';
import { Hotels } from './hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from './hotels.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels)
    private readonly hotelsRepository: Repository<Hotels>,
    private readonly imageRepository: ImagesService,
    private readonly hotelTypeRepository: HotelTypeService,
  ) { }

  async create(createHotelDto: CreateHotelDto) {
    const { images, type, ...hotelsData } = createHotelDto;
    const hotelType = await this.hotelTypeRepository.findHotelTypeByHotelId(type);
    const newHotel = this.hotelsRepository.create(hotelsData);

    if (hotelType) {
      newHotel.type = hotelType;
    }
    await this.hotelsRepository.save(newHotel);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addHotelImage(image, newHotel);
      })
    }

    return {
      statusCode: 201,
      message: 'Hotel created successfully',
      data: newHotel,
    }
  }

  async findAll(
    country: string,
    city: string,
    type: string,
    page: number,
    limit: number,
    searchQuery: string) {
    let conditions = {}

    if (country) {
      conditions = { country: country }
    }

    if (city) {
      conditions = { ...conditions, city: city }
    }

    if (type) {
      conditions['type'] = { id: +type };
    }

    if (searchQuery) {
      conditions = {
        ...conditions,
        name: Like(`%${searchQuery}%`),
      };
    }
    const skip = (+page - 1) * +limit;

    const [hotels, totalCount] = await this.hotelsRepository.findAndCount({
      where: conditions,
      skip,
      take: +limit,
      relations: ["type"],
    });

    const totalPages = Math.ceil(totalCount / +limit);


    return {
      statusCode: 200,
      message: 'Hotels retrieved successfully',
      data: hotels,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const hotel = await this.hotelsRepository.findOne({
      where: { id },
      relations: ["images", "reviews"]
    });

    if (!hotel) {
      return {
        statusCode: 404,
        message: 'Hotel not found',
      }
    }
    return {
      statusCode: 200,
      data: hotel,
    }
  }


  async update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  async remove(id: number) {
    return `This action removes a #${id} hotel`;
  }

  async findOneById(id: number) {
    return this.hotelsRepository.findOne({
      where: { id }
    })
  }
}
