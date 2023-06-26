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
        await this.imageRepository.addHotelImage(image, newAccessory);
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
      relations: ["type"],
    });

    const totalPages = Math.ceil(totalCount / +limit);


    return {
      statusCode: 200,
      message: 'Accessories retrieved successfully',
      data: accessories,
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
      relations: ["type"]
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
    return `This action updates a #${id} tourAccessory`;
  }

  async remove(id: number) {
    return `This action removes a #${id} tourAccessory`;
  }

  async findOneById(id: number) {
    return this.tourAccessoryRepository.findOne({ where: { id: id } })
  }
}
