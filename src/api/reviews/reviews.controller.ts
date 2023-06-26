import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateReviewDto, UpdateReviewDto } from './reviews.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post('create')
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.reviewsService.findAll(page || 1, limit || 10);
  }

  @Get('pending')
  findAllInactiveReviews(@Query('page') page: number, @Query('limit') limit: number) {
    return this.reviewsService.findAllInactiveReviews(+page || 1, +limit || 10);
  }

  @Get('car/:id')
  findCarReviews(@Param('id') id: string) {
    return this.reviewsService.findCarReviews(+id);
  }

  @Get('active/:id')
  makeReviewActive(@Param('id') id: string) {
    return this.reviewsService.makeReviewActive(+id);
  }

  @Get('hotel/:id')
  findHotelReviews(@Param('id') id: string) {
    return this.reviewsService.findHotelReviews(+id);
  }

  @Get('tour/:id')
  findTourReviews(@Param('id') id: string) {
    return this.reviewsService.findTourReviews(+id);
  }

  @Get('accessory/:id')
  findAccessoryReviews(@Param('id') id: string) {
    return this.reviewsService.findAccessoriesReviews(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
