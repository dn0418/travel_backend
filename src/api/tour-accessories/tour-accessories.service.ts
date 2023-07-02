import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { AccessoryTypeService } from './accessory-type/accessory-type.service';
import { CreateTourAccessoryDto, UpdateTourAccessoryDto } from './tour-accessory.dto';
import { TourAccessory } from './tour-accessory.entity';

@Injectable()
export class TourAccessoriesService {
  constructor(
    @InjectRepository(TourAccessory)
    private readonly tourAccessoryRepository: Repository<TourAccessory>,
    private readonly imageRepository: ImagesService,
    private readonly accesoriesTypeRepository: AccessoryTypeService,
  ) { }

  async create(createTourAccessoryDto: CreateTourAccessoryDto) {
    const { images, type, ...accessoryData } = createTourAccessoryDto;
    const accessoryType = await this.accesoriesTypeRepository.findAccessoryTypeById(type);
    const newAccessory = this.tourAccessoryRepository.create(accessoryData);

    if (accessoryType) {
      newAccessory.type = accessoryType;
    }
    await this.tourAccessoryRepository.save(newAccessory);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.AddaccessoryImage(image, newAccessory);
      })
    }

    return {
      statusCode: 201,
      message: 'Accessory created successfully',
      data: newAccessory,
    }
  }

  async findAll(
    page: number,
    limit: number,
    searchQuery: string) {
    let conditions = {}


    if (searchQuery) {
      conditions = {
        ...conditions,
        title: Like(`%${searchQuery}%`),
      };
    }
    const skip = (+page - 1) * +limit;

    const [accessories, totalCount] = await this.tourAccessoryRepository.findAndCount({
      where: conditions,
      skip,
      take: +limit,
      relations: ["type", "reviews"],
    });

    const totalPages = Math.ceil(totalCount / +limit);

    // Calculate average rating for each hotel
    const accessoryWithAvgRating = accessories.map((accessory) => {
      const ratings = accessory.reviews.map((review) => review.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return { ...accessory, rating: averageRating };
    });

    return {
      statusCode: 200,
      message: 'Accessories retrieved successfully',
      data: accessoryWithAvgRating,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const accessory = await this.tourAccessoryRepository.findOne({
      where: { id },
      relations: ["type", "images"]
    });

    if (!accessory) {
      return {
        statusCode: 404,
        message: 'Accessory not found',
      }
    }

    return {
      statusCode: 200,
      message: 'Accessory retrieved successfully',
      data: accessory,
    }


  }

  async update(id: number, updateTourAccessoryDto: UpdateTourAccessoryDto) {
    const { type, ...accessoryData } = updateTourAccessoryDto;
    const accessoryType = await this.accesoriesTypeRepository.findAccessoryTypeById(type);
    const accessory = await this.tourAccessoryRepository.findOne({ where: { id } });

    if (accessoryType) {
      accessory.type = accessoryType;
    }
    await this.tourAccessoryRepository.save({
      ...accessory,
      ...accessoryData,
    });

    return {
      statusCode: 200,
      message: 'Accessory updated successfully',
      data: accessory,
    }

  }

  async remove(id: number) {
    const accessory = await this.tourAccessoryRepository.findOne({ where: { id } });
    await this.tourAccessoryRepository.remove(accessory);

    return {
      statusCode: 200,
      message: 'Accessory deleted successfully',
      data: accessory,
    }
  }

  async findOneById(id: number) {
    return this.tourAccessoryRepository.findOne({ where: { id: id } })
  }
}
