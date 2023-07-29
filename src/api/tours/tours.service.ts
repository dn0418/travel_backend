import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { ReviewsService } from '../reviews/reviews.service';
import { DeparturesPricing } from './departures-pricing/departures-pricing.entity';
import { DestinationsService } from './destinations/destinations.service';
import { IndividualPricing } from './individual-pricing/individual-pricing.entity';
import { Routes } from './routes/route.entity';
import { TourServices } from './tour-services/tour-service.entity';
import { CreateImageDto, CreateTourDto, UpdateTourDto } from './tour.dto';
import { Tours } from './tour.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tours)
    private readonly toursRepository: Repository<Tours>,

    @InjectRepository(TourServices)
    private readonly servicesRepository: Repository<TourServices>,

    @InjectRepository(Routes)
    private readonly routesRepository: Repository<Routes>,

    @InjectRepository(IndividualPricing)
    private readonly individualRepository: Repository<IndividualPricing>,

    @InjectRepository(DeparturesPricing)
    private readonly departuresRepository: Repository<DeparturesPricing>,

    @Inject(forwardRef(() => ReviewsService))
    private reviewRepository: ReviewsService,

    private readonly destinationRepository: DestinationsService,

    private readonly imageRepository: ImagesService,

    @InjectConnection()
    private connection: Connection,
  ) { }


  // Create a new tour
  async create(createTourDto: CreateTourDto) {
    const {
      destinationId,
      includesServices,
      excludeServices,
      images,
      routes,
      individualPricing,
      departuresPricing,
      ...newData
    } = createTourDto;

    const newTour = this.toursRepository.create(newData);
    const destination = await this.destinationRepository.findDestinationById(destinationId);

    if (destination) {
      newTour.destination = destination;
    }

    const tour = await this.toursRepository.save(newTour);

    if (includesServices.length > 0) {
      includesServices.forEach(async (service) => {
        const newService = this.servicesRepository.create({
          text: service.en,
          text_ru: service.ru,
          text_hy: service.hy,
          tour: tour,
          type: 'include'
        });
        return await this.servicesRepository.save(newService);
      })
    }

    if (excludeServices.length > 0) {
      excludeServices.forEach(async (service) => {
        const newService = this.servicesRepository.create({
          text: service.en,
          text_ru: service.ru,
          text_hy: service.hy,
          tour: tour,
          type: 'exclude'
        });
        return await this.servicesRepository.save(newService);
      })
    }

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addTourImage(image, tour);
      })
    }

    if (routes.length > 0) {
      routes.forEach(async (route) => {
        const newRoute = this.routesRepository.create({
          ...route,
          tour: tour
        });
        await this.routesRepository.save(newRoute);
      })
    }

    if (individualPricing.length > 0) {
      individualPricing.forEach(async (individual) => {
        const newIndividual = this.individualRepository.create({
          ...individual,
          tour: tour
        });
        await this.individualRepository.save(newIndividual);
      })
    }

    if (departuresPricing.length > 0) {
      departuresPricing.forEach(async (departure) => {
        const newDeparture = this.departuresRepository.create({
          ...departure,
          tour: tour
        });
        await this.departuresRepository.save(newDeparture);
      })
    }

    return {
      status: 201,
      message: 'Tour created successfully',
      data: tour
    }
  }

  async createNewImage(imageDto: CreateImageDto) {
    const { tourId, url } = imageDto;
    const tour = await this.toursRepository.findOne({ where: { id: tourId } });
    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    const tourImage = await this.imageRepository.addTourImage(url, tour);

    return {
      data: tourImage,
    }
  }

  // Find All Tours
  async findAll(
    type: string,
    page: number,
    limit: number,
    searchQuery: string,
    destination: string,
    days: string,
    month: string,
    language: string,
  ) {
    let conditions = {}

    if (type) {
      conditions['mainList'] = type;
    }

    if (language && language === 'ru') {
      conditions = { ...conditions, isRu: true }
    } else if (language && language === 'hy') {
      conditions = { ...conditions, isHy: true }
    }

    if (days) {
      conditions = {
        ...conditions,
        dayLength: parseInt(days)
      }
    }

    if (destination) {
      conditions['destination'] = { id: parseInt(destination) };
    }

    if (searchQuery) {
      conditions = {
        ...conditions,
        title: Like(`%${searchQuery}%`),
      };
    }

    if (month) {
      conditions = {
        ...conditions,
        bestTime: Like(`%${month}%`),
      };
    }

    const skip = (+page - 1) * +limit;

    const [tours, totalCount] = await this.toursRepository.findAndCount({
      where: conditions,
      skip,
      take: +limit,
      relations: ["reviews"],
    });

    const totalPages = Math.ceil(totalCount / +limit);

    // Calculate average rating for each hotel
    const toursWithAvgRating = tours.map((tour) => {
      const ratings = tour.reviews.map((review) => review.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return { ...tour, rating: averageRating };
    });

    return {
      status: 200,
      message: 'Tours retrieved successfully',
      data: toursWithAvgRating,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  // Find Tour By Id
  async findOne(id: number) {
    const tour = await this.toursRepository.findOne(
      {
        where: { id },
        relations: [
          'reviews',
          'destination',
          'includesServices',
          'excludeServices',
          'images',
          'routes',
          'individualPricing',
          'departuresPricing'
        ]
      }
    );

    if (tour) {
      return {
        status: 200,
        data: tour
      }
    }

    return {
      status: 404,
      message: 'Tour not found'
    }
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    const { destinationId, ...tourData } = updateTourDto;
    const tour = await this.toursRepository.findOne({ where: { id: id } });
    if (!tour) {
      return {
        status: 404,
        message: 'Tour not found'
      }
    };
    const destination = await this.destinationRepository.findDestinationById(destinationId);

    if (destination) {
      await this.toursRepository.save({
        ...tour,
        ...tourData,
        destination: destination
      });
    } else {
      await this.toursRepository.save({
        ...tour,
        ...tourData
      });
    }

    return {
      status: 200,
      message: 'Tour updated successfully'
    }
  }

  // Remove Tour By Id
  async remove(id: number) {
    const tour = await this.toursRepository.findOne({
      where: { id: id },
      relations: [
        'includesServices',
        'excludeServices',
        'images',
        'routes',
        'individualPricing',
        'departuresPricing',
        'reviews'
      ]
    });

    if (!tour) {
      return {
        status: 404,
        message: 'Tour not found'
      }
    }

    if (tour.includesServices.length > 0) {
      await Promise.all(tour.includesServices.map(async (service) => {
        await this.servicesRepository.remove(service);
      }));
    }

    if (tour.excludeServices.length > 0) {
      await Promise.all(tour.excludeServices.map(async (service) => {
        await this.servicesRepository.remove(service);
      }));
    }

    if (tour.images.length > 0) {
      await Promise.all(tour.images.map(async (image) => {
        await this.imageRepository.remove(image.id);
      }));
    }

    if (tour.routes.length > 0) {
      await Promise.all(tour.routes.map(async (route) => {
        await this.routesRepository.remove(route);
      }));
    }

    if (tour.individualPricing.length > 0) {
      await Promise.all(tour.individualPricing.map(async (individual) => {
        await this.individualRepository.remove(individual);
      }));
    }

    if (tour.departuresPricing.length > 0) {
      await Promise.all(tour.departuresPricing.map(async (departure) => {
        await this.departuresRepository.remove(departure);
      }));
    }

    if (tour.reviews.length > 0) {
      await Promise.all(tour.reviews.map(async (review) => {
        await this.reviewRepository.remove(review.id);
      }));
    }

    await this.toursRepository.remove(tour);

    return {
      status: 200,
      message: 'Tour deleted successfully'
    }
  }

  async getTourById(id: number) {
    const tour = await this.toursRepository.findOne({ where: { id } });
    return tour;
  }
}
