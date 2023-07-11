import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesService } from 'src/api/images/images.service';
import { Repository } from 'typeorm';
import { CreateAirportTransportDto, UpdateAirportTransportDto } from './airport-transport.dto';
import { AirportTransport } from './airport-transport.entity';


@Injectable()
export class AirportTransportService {
  constructor(
    @InjectRepository(AirportTransport)
    private readonly airportTransportRepository: Repository<AirportTransport>,
    private readonly imageRepository: ImagesService,
  ) { }

  async create(createAirportTransportDto: CreateAirportTransportDto) {
    const allTransports = await this.airportTransportRepository.find();
    if (allTransports.length > 0) {
      return {
        message: 'AirportTransport already created',
        data: allTransports,
      }
    }

    const { description, images } = createAirportTransportDto;
    const newAirportTransport = this.airportTransportRepository.create({ description });
    const airportTransport = this.airportTransportRepository.save(newAirportTransport);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addAirportTransportImage(image, airportTransport);
      })
    }

    return {
      message: 'AirportTransport created successfully',
      data: airportTransport,
    }
  }

  async findAll() {
    const allTransports = await this.airportTransportRepository.find({
      relations: ['images']
    });

    return {
      message: 'AirportTransport fetched successfully',
      data: allTransports,
    }
  }

  async update(id: number, updateAirportTransportDto: UpdateAirportTransportDto) {
    const findAirportTransport = await this.airportTransportRepository.findOne({
      where: { id: id }
    });

    if (!findAirportTransport) {
      return {
        message: 'AirportTransport not found',
        statusCode: 404,
      }
    }

    const updatedAirportTransport = await this.airportTransportRepository.save({
      ...findAirportTransport,
      ...updateAirportTransportDto,
    });

    return {
      statusCode: 200,
      message: 'AirportTransport updated successfully',
      data: updatedAirportTransport,
    }
  }
}
