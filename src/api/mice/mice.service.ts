import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateMiceDto, UpdateMiceDto } from './create-mouse.dto';
import { Mice } from './mice.entity';

@Injectable()
export class MiceService {
  constructor(
    @InjectRepository(Mice)
    private readonly miceRepository: Repository<Mice>,

    @Inject(forwardRef(() => ReviewsService))
    private reviewRepository: ReviewsService,

    private readonly imageRepository: ImagesService,
  ) { }

  async create(createMouseDto: CreateMiceDto) {
    const { images, ...miceData } = createMouseDto;
    const newMice = this.miceRepository.create(miceData);
    const mice = await this.miceRepository.save(newMice);

    if (images.length > 0) {
      images.forEach(async (image) => {
        await this.imageRepository.addMiceImage(image, mice);
      })
    }

    return {
      status: 201,
      message: 'Mice created successfully',
      data: mice,
    }
  }

  async findAll(
    page: number,
    limit: number,
    searchQuery?: string,
    language?: string,
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

  async findRealated() {
    const hotels = await this.miceRepository.find({
      take: 10,
      order: {
        score: "DESC"
      }
    });

    return {
      data: hotels,
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
    const mice = await this.miceRepository.findOne({
      where: { id },
    });

    if (!mice) {
      return {
        status: 404,
        message: 'Mice not found',
      }
    }

    const updated = await this.miceRepository.save({
      ...mice,
      ...updateMouseDto,
    })

    return {
      status: 200,
      message: 'Mice updated successfully',
      data: updated,
    }
  }

  async remove(id: number) {
    const findMice = await this.miceRepository.findOne({
      where: { id: id },
      relations: ['reviews', 'images']
    });
    if (!findMice) {
      throw new NotFoundException('Mice not found');
    }

    if (findMice.images.length > 0) {
      await Promise.all(findMice.images.map(async (image) => {
        await this.imageRepository.remove(image.id);
      }));
    }

    if (findMice.reviews.length > 0) {
      await Promise.all(findMice.reviews.map(async (review) => {
        await this.reviewRepository.remove(review.id);
      }));
    }

    await this.miceRepository.remove(findMice);

    return {
      status: 200,
      message: 'Mice deleted successfully',
    }
  }

  async findOneById(id: number) {
    return this.miceRepository.findOne({
      where: { id }
    })
  }
}
