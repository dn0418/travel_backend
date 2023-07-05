import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { HotelTypeService } from './hotel-type/hotel-type.service';
import { Hotels } from './hotel.entity';
import { CreateHotelDto, UpdateHotelDto } from './hotels.dto';
import { PricingTable } from './pricing-table/pricing-table.entity';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotels)
    private readonly hotelsRepository: Repository<Hotels>,

    @InjectRepository(PricingTable)
    private readonly pricingRepository: Repository<PricingTable>,

    private readonly imageRepository: ImagesService,
    private readonly hotelTypeRepository: HotelTypeService,
  ) { }

  async create(createHotelDto: CreateHotelDto) {
    const { images, pricingData, type, ...hotelsData } = createHotelDto;
    const hotelType = await this.hotelTypeRepository.findHotelTypeByHotelId(type);
    const newHotel = this.hotelsRepository.create(hotelsData);

    if (hotelType) {
      newHotel.type = hotelType;
    }

    const hotel = await this.hotelsRepository.save(newHotel);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addHotelImage(image, hotel);
      })
    }

    if (pricingData.length > 0) {
      pricingData.forEach(async (pricing) => {
        const newPricing = this.pricingRepository.create({ ...pricing, hotel: hotel });
        await this.pricingRepository.save(newPricing);
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
      relations: ["type", "reviews"],
    });

    const totalPages = Math.ceil(totalCount / +limit);

    // Calculate average rating for each hotel
    const hotelsWithAvgRating = hotels.map((hotel) => {
      const ratings = hotel.reviews.map((review) => review.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return { ...hotel, rating: averageRating };
    });

    return {
      statusCode: 200,
      message: 'Hotels retrieved successfully',
      data: hotelsWithAvgRating,
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
      relations: ["images", "reviews", "type"]
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
