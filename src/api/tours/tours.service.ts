import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateTourDto, UpdateTourDto } from './tour.dto';
import { Tours } from './tour.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(Tours)
    private readonly toursRepository: Repository<Tours>,
    @InjectConnection()
    private connection: Connection,
  ) { }


  // Create a new tour
  async create(createTourDto: CreateTourDto) {
    const { destination, tourType, ...toursData } = createTourDto;
    const newTour = this.toursRepository.create(toursData);

    const tour = await this.toursRepository.save(newTour);

    if (tour) {
      return {
        statusCode: 201,
        message: 'Tour created successfully',
        data: tour,
      }
    }

    return {
      statusCode: 500,
      message: 'Something went wrong',
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
      { where: { id }, relations: ['reviews'] }
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
