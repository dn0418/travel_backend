import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { CreateEventsDto, CreateEventsImageDto, UpdateEventsDto } from './events.dto';
import { Events } from './events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>,
    private readonly imageRepository: ImagesService,
  ) { }

  async create(createEventsDto: CreateEventsDto) {
    const { images, ...newData } = createEventsDto;
    const newEvent = this.eventsRepository.create(newData);
    const event = await this.eventsRepository.save(newEvent);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addEventImage(image, event);
      })
    }

    return {
      status: 201,
      data: event,
      message: 'Event created successfully'
    }
  }

  async createNewImage(newImage: CreateEventsImageDto) {
    const { eventId, url } = newImage;
    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      return {
        status: 404,
        message: 'Event not found'
      }
    }

    const image = await this.imageRepository.addEventImage(url, event);
    return {
      status: 201,
      data: image,
      message: 'Event added successfully'
    }
  }

  async findAll(
    type: string,
    page: number,
    limit: number,
    searchQuery: string,
    language: string
  ) {
    let conditions = {}

    if (type) {
      conditions = { ...conditions, type: type }
    }

    if (language && language === 'ru') {
      conditions = { ...conditions, isRu: true }
    } else if (language && language === 'hy') {
      conditions = { ...conditions, isHy: true }
    }

    if (searchQuery) {
      conditions = {
        ...conditions,
        name: Like(`%${searchQuery}%`),
      };
    };
    const skip = (+page - 1) * +limit;

    const [events, totalCount] = await this.eventsRepository.findAndCount({
      where: conditions,
      skip,
      take: +limit,
    });

    const totalPages = Math.ceil(totalCount / +limit);

    return {
      status: 200,
      message: 'Surroundings retrieved successfully',
      data: events,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const event = await this.eventsRepository.findOne({
      where: { id: id },
      relations: ["images"],
    });

    if (!event) {
      return {
        status: 404,
        message: 'Event not found'
      }
    }

    return {
      status: 200,
      data: event
    }
  }

  async update(id: number, updateEventDto: UpdateEventsDto) {
    const event = await this.eventsRepository.findOne({ where: { id: id } });

    if (!event) {
      return {
        status: 404,
        message: 'Event not found'
      }
    }

    const updatedEvent = await this.eventsRepository.save({
      ...event,
      ...updateEventDto
    });

    return {
      status: 200,
      data: updatedEvent,
      message: 'Event updated successfully'
    }
  }

  async remove(id: number) {
    const event = await this.eventsRepository.findOne({
      where: { id: id },
      relations: ["images"]
    });

    if (!event) {
      return {
        status: 404,
        message: 'Event not found'
      }
    }

    if (event.images.length > 0) {
      await Promise.all(event.images.map(async (image) => {
        await this.imageRepository.remove(image.id);
      }));
    }

    await this.eventsRepository.remove(event);

    return {
      status: 200,
      message: 'Event deleted successfully'
    }
  }

  async findById(id: number) {
    return this.eventsRepository.findOne({ where: { id: id } })
  }
}
