import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBlogDto, UpdateBlogDto } from './blog.dto';
import { Blog } from './blog.entity';
import { Rubric } from './rubrics/rubric.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Rubric)
    private readonly rubricRepository: Repository<Rubric>,

    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) { }

  async create(createBlogDto: CreateBlogDto) {
    const { rubric, ...newData } = createBlogDto;
    const findRubric = await this.rubricRepository.findOne({ where: { id: rubric } });
    if (!findRubric) {
      return {
        status: 400,
        message: 'Rubric not found'
      }
    }

    const newBlog = this.blogRepository.create({
      ...newData,
      rubric: findRubric
    });
    const blog = await this.blogRepository.save(newBlog);

    return {
      status: 201,
      message: 'Blog created successfully',
      data: blog
    }
  }

  async findAll(
    page: number,
    limit: number,
    searchQuery: string,
    language: string
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
        title: Like(`%${searchQuery}%`),
      };
    };
    const skip = (+page - 1) * +limit;

    const [blogs, totalCount] = await this.blogRepository.findAndCount({
      where: conditions,
      skip,
      take: +limit,
      relations: ['rubric'],
      order: {
        createdAt: 'DESC',
      }
    });

    const totalPages = Math.ceil(totalCount / +limit);

    return {
      status: 200,
      message: 'Blogs retrieved successfully',
      data: blogs,
      meta: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    }
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne(
      {
        where: { id: id },
        relations: ['rubric']
      }
    );

    if (!blog) {
      return {
        status: 404,
        message: 'Blog post not found!'
      }
    }

    return {
      status: 200,
      message: 'Blog fetched successfully',
      data: blog
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const findBlog = await this.blogRepository.findOne({ where: { id: id } });

    if (!findBlog) {
      return {
        status: 404,
        message: 'Blog post not found!'
      }
    }
    const updated = await this.blogRepository.save({
      ...findBlog,
      ...updateBlogDto
    });

    return {
      status: 200,
      message: 'Blog updated successfully',
      data: updated
    }
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id: id } });

    if (!blog) {
      return {
        status: 404,
        message: 'Blog post not found!'
      }
    }

    await this.blogRepository.delete(id);

    return {
      status: 200,
      message: 'Blog deleted successfully'
    }
  }
}
