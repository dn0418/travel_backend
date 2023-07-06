import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageDto, UpdateImageDto } from './images.dto';
import { Images } from './images.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Images)
    private readonly imagesRepository: Repository<Images>,
  ) { }

  async create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  async addHotelImage(image: string, hotel) {
    const newImage = this.imagesRepository.create({
      url: image,
      hotel: hotel
    });
    await this.imagesRepository.save(newImage);
  }

  addThingToSeeImage(image: string, thing) {
    const newImage = this.imagesRepository.create({
      url: image,
      thingToSee: thing
    });
    return this.imagesRepository.save(newImage);

  }

  async addTourImage(image: string, tour) {
    const newImage = this.imagesRepository.create({
      url: image,
      tour: tour
    });
    await this.imagesRepository.save(newImage);
  }

  async AddaccessoryImage(image: string, accessory) {
    const newImage = this.imagesRepository.create({
      url: image,
      accessory: accessory
    });

    await this.imagesRepository.save(newImage);
  }


  async findAll() {
    return `This action returns all images`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
