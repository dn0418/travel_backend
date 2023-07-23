import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../../images/images.service';
import { CreateNewImageDto } from '../airport-transport/airport-transport.dto';
import { PricingWithDriver } from './pricing-with-driver.entity';
import { CreateNewPricingWithDriverDto, CreateWithDriverDto, UpdatePricingWithDriverDto, UpdateWithDriverDto } from './with-driver.dto';
import { WithDriver } from './with-driver.entity';

@Injectable()
export class WithDriverService {
  constructor(
    @InjectRepository(WithDriver)
    private readonly carWithDriverRepository: Repository<WithDriver>,

    @InjectRepository(PricingWithDriver)
    private readonly pricingRepository: Repository<PricingWithDriver>,

    private readonly imageRepository: ImagesService,
  ) { }

  async create(createWithDriverDto: CreateWithDriverDto) {
    const allData = await this.carWithDriverRepository.find();
    if (allData.length !== 0) {
      return {
        statusCode: 400,
        message: 'Car With Driver already exists',
      }
    }

    const { pricing, images, ...newData } = createWithDriverDto;
    const newCar = this.carWithDriverRepository.create(newData);
    const car = await this.carWithDriverRepository.save(newCar);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addCarWithDriverImage(image, car);
      })
    }

    if (pricing.length > 0) {
      pricing.forEach(async (pricing) => {
        const newPricing = this.pricingRepository.create({
          ...pricing,
          car: car,
        });
        await this.pricingRepository.save(newPricing);
      });
    }

    return {
      statusCode: 201,
      message: 'Car With Driver created successfully',
      data: car,
    }
  }

  async createNewImage(newImage: CreateNewImageDto) {
    const { id, url } = newImage;
    const findWithDriver = await this.carWithDriverRepository.findOne({
      where: { id: id }
    })

    if (!findWithDriver) {
      return {
        message: 'Car with driver not found',
        statusCode: 404,
      }
    }

    const image = await this.imageRepository.addCarWithDriverImage(url, findWithDriver);

    return {
      message: 'Image added successfully',
      data: image,
    }
  }

  async createNewPrice(createDto: CreateNewPricingWithDriverDto) {
    const { carId, ...newData } = createDto;
    const car = await this.carWithDriverRepository.findOne({
      where: { id: carId }
    });

    if (!car) {
      return {
        statusCode: 404,
        message: 'Car not found',
      }
    }

    const newPricing = this.pricingRepository.create(newData);
    newPricing.car = car;
    await this.pricingRepository.save(newPricing);

    return {
      statusCode: 201,
      message: 'Pricing with driver created successfully',
      data: newPricing,
    }
  }

  async updatePrice(id: number, updateDto: UpdatePricingWithDriverDto) {
    const findPrice = await this.pricingRepository.findOne({ where: { id } });
    if (!findPrice) {
      return {
        statusCode: 400,
        message: 'Pricing with driver not found',
      }
    }

    const updatePrice = await this.pricingRepository.save({
      ...findPrice,
      ...updateDto,
    });

    return {
      statusCode: 200,
      message: 'Pricing with driver updated successfully',
      data: updatePrice,
    }
  }

  async deletePrice(id: number) {
    const findPrice = await this.pricingRepository.findOne({ where: { id } });
    if (!findPrice) {
      return {
        statusCode: 400,
        message: 'Pricing with driver not found',
      }
    }

    await this.pricingRepository.delete(id);

    return {
      statusCode: 200,
      message: 'Pricing with driver deleted successfully',
    }
  }

  async findAll() {
    const data = await this.carWithDriverRepository.find(
      {
        relations: ["pricing", "images"]
      }
    );
    return {
      statusCode: 200,
      data: data,
    }
  }

  async update(id: number, updateCarDto: UpdateWithDriverDto) {
    const findCar = await this.carWithDriverRepository.findOne({ where: { id } });
    if (!findCar) {
      return {
        statusCode: 400,
        message: 'Car not found',
      }
    }

    const updateCar = await this.carWithDriverRepository.save({
      ...findCar,
      ...updateCarDto,
    });

    return {
      statusCode: 200,
      message: 'Car updated successfully',
      data: updateCar,
    }
  }
}
