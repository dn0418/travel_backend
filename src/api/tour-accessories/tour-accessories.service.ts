import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { ReviewsService } from '../reviews/reviews.service';
import { AccessoriesPricingService } from './accessories-pricing/accessories-pricing.service';
import { AccessoryTypeService } from './accessory-type/accessory-type.service';
import { CreateAccessoryImageDto, CreateTourAccessoryDto, UpdateTourAccessoryDto } from './tour-accessory.dto';
import { TourAccessory } from './tour-accessory.entity';

@Injectable()
export class TourAccessoriesService {
  constructor(
    @InjectRepository(TourAccessory)
    private readonly tourAccessoryRepository: Repository<TourAccessory>,

    @Inject(forwardRef(() => ReviewsService))
    private reviewRepository: ReviewsService,

    private readonly imageRepository: ImagesService,
    private readonly typeRepository: AccessoryTypeService,
    private readonly pricingRepository: AccessoriesPricingService,
  ) { }

  async create(createTourAccessoryDto: CreateTourAccessoryDto) {
    const { images, pricing, type, ...accessoryData } = createTourAccessoryDto;
    const accessoryType = await this.typeRepository.findAccessoryTypeById(type);
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

    if (pricing.length > 0) {
      pricing.forEach(async (price) => {
        await this.pricingRepository.createWithAccessories(price, newAccessory);
      })
    }

    return {
      status: 201,
      message: 'Accessory created successfully',
      data: newAccessory,
    }
  }

  async createNewImage(imageInput: CreateAccessoryImageDto) {
    const { accessoryId, url } = imageInput;
    const findAccessory = await this.tourAccessoryRepository.findOne({ where: { id: accessoryId } });
    if (!findAccessory) {
      return {
        status: 404,
        message: 'Accessory not found',
      }
    }
    const newImage = await this.imageRepository.AddaccessoryImage(url, findAccessory);
    return {
      status: 201,
      message: 'Image created successfully',
      data: newImage,
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
      status: 200,
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
      relations: ["type", "images", "pricing"]
    });

    if (!accessory) {
      return {
        status: 404,
        message: 'Accessory not found',
      }
    }

    return {
      status: 200,
      message: 'Accessory retrieved successfully',
      data: accessory,
    }


  }

  async update(id: number, updateTourAccessoryDto: UpdateTourAccessoryDto) {
    const { type, ...accessoryData } = updateTourAccessoryDto;
    const accessoryType = await this.typeRepository.findAccessoryTypeById(type);
    const accessory = await this.tourAccessoryRepository.findOne({ where: { id } });

    if (accessoryType) {
      accessory.type = accessoryType;
    }
    await this.tourAccessoryRepository.save({
      ...accessory,
      ...accessoryData,
    });

    return {
      status: 200,
      message: 'Accessory updated successfully',
      data: accessory,
    }

  }

  async remove(id: number) {
    const accessory = await this.tourAccessoryRepository.findOne({
      where: { id },
      relations: ["images", "pricing", "reviews"]
    });

    if (!accessory) {
      return {
        status: 404,
        message: 'Accessory not found',
      }
    }

    if (accessory.images.length > 0) {
      await Promise.all(accessory.images.map(async (image) => {
        await this.imageRepository.remove(image.id);
      }));
    }

    if (accessory.pricing.length > 0) {
      await Promise.all(accessory.pricing.map(async (price) => {
        await this.pricingRepository.remove(price.id);
      }));
    }

    if (accessory.reviews.length > 0) {
      await Promise.all(accessory.reviews.map(async (review) => {
        await this.reviewRepository.remove(review.id);
      }));
    }

    await this.tourAccessoryRepository.remove(accessory);

    return {
      status: 200,
      message: 'Accessory deleted successfully',
      data: accessory,
    }
  }

  async findOneById(id: number) {
    return this.tourAccessoryRepository.findOne({ where: { id: id } })
  }
}
