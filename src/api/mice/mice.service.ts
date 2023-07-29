import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMiceDto, UpdateMiceDto } from './create-mouse.dto';
import { Mice } from './mice.entity';


@Injectable()
export class MiceService {
  constructor(
    @InjectRepository(Mice)
    private readonly miceRepository: Repository<Mice>,
  ) { }

  async create(createMouseDto: CreateMiceDto) {
    return 'This action adds a new mouse';
  }

  async findAll(page: number, limit: number, searchQuery?: string) {
    let conditions = {}

    if (searchQuery) {
      conditions = {
        ...conditions,
        name: Like(`%${searchQuery}%`),
      };
    }

    const skip = (page - 1) * limit;
    const [mices, totalCount] = await this.miceRepository.findAndCount({
      where: conditions,
      skip,
      take: limit,
      relations: ['reviews']
    });

    const totalPages = Math.ceil(totalCount / +limit);

    // Calculate average rating for each hotel
    const micesWithAvgRating = mices.map((mice) => {
      const ratings = mice.reviews.map((review) => review.rating);
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRating / ratings.length;
      return { ...mice, rating: averageRating };
    });

    return {
      status: 200,
      message: 'Mice retrieved successfully',
      data: micesWithAvgRating,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const mice = await this.miceRepository.findOne({
      where: { id },
      relations: ['reviews', 'images']
    });

    if (!mice) {
      return {
        status: 404,
        message: 'Mouse not found',
      }
    }

    return {
      status: 200,
      data: mice,
    }
  }

  async update(id: number, updateMouseDto: UpdateMiceDto) {
    return `This action updates a #${id} mouse`;
  }

  async remove(id: number) {
    return `This action removes a #${id} mouse`;
  }
}
