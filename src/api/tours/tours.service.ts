import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { DeparturesPricing } from './departures-pricing/departures-pricing.entity';
import { DestinationsService } from './destinations/destinations.service';
import { IndividualPricing } from './individual-pricing/individual-pricing.entity';
import { Routes } from './routes/route.entity';
import { TourServices } from './tour-services/tour-service.entity';
import { CreateTourDto, UpdateTourDto } from './tour.dto';
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
          text: service,
          tour: tour,
          type: 'include'
        });
        return await this.servicesRepository.save(newService);
      })
    }

    if (excludeServices.length > 0) {
      excludeServices.forEach(async (service) => {
        const newService = this.servicesRepository.create({
          text: service,
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
      statusCode: 201,
      message: 'Tour created successfully',
      data: tour
    }
  }

  // Find All Tours
  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const countQuery = `SELECT COUNT(*) AS total FROM tours`;

    const query = `
    SELECT
      tours.*,
      AVG(reviews.rating) AS reviewsRating,
      COUNT(reviews.id) AS reviewsQuantity
    FROM
      tours
    LEFT JOIN
      reviews ON tours.id = reviews.tourId
    GROUP BY
      tours.id
    LIMIT
      ${limit}
    OFFSET
      ${offset}
  `;

    const [countResult, tours] = await Promise.all([
      this.connection.query(countQuery),
      this.connection.query(query),
    ]);

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    return {
      statusCode: 200,
      data: {
        tours,
        total,
        totalPages,
      },
    };
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
        statusCode: 200,
        data: tour
      }
    }

    return {
      statusCode: 404,
      message: 'Tour not found'
    }
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    const tour = await this.toursRepository.findOneById(id);

    if (tour) {
      await this.toursRepository.save({
        ...tour,
        ...updateTourDto
      });

      return {
        statusCode: 200,
        message: 'Tour updated successfully'
      }
    }

    return {
      statusCode: 404,
      message: 'Tour not found'
    }
  }

  // Remove Tour By Id
  async remove(id: number) {
    const tour = await this.toursRepository.findOneById(id);

    if (tour) {
      await this.toursRepository.remove(tour);
      return {
        statusCode: 200,
        message: 'Tour deleted successfully'
      }
    }

    return {
      statusCode: 404,
      message: 'Tour not found'
    }
  }

  async getTourById(id: number) {
    const tour = await this.toursRepository.findOne({ where: { id } });
    return tour;
  }
}
