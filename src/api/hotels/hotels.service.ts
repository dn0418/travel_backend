import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { Hotels } from './hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from './hotels.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels)
    private readonly hotelsRepository: Repository<Hotels>,
    private readonly imageRepository: ImagesService,
  ) { }

  async create(createHotelDto: CreateHotelDto) {
    const { images, ...hotelsData } = createHotelDto;
    const newHotel = this.hotelsRepository.create(hotelsData);
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

  async findAll(country: string, city: string, type: string) {
    const query = this.hotelsRepository.createQueryBuilder('hotels')
      .leftJoin('hotels.reviews', 'reviews')
      .select([
        'hotels.*',
        'AVG(reviews.rating) as rating',
        'COUNT(reviews.id) as reviewCount', // Average rating from reviews
      ])
      .groupBy('hotels.id')

    if (country) {
      query.andWhere('hotels.country = :country', { country })
    }
    if (city) {
      query.andWhere('hotels.city = :city', { city })
    }
    if (type) {
      query.andWhere('hotels.type = :type', { type })
    }

    const hotels = await query.getRawMany();

    return {
      data: hotels,
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
