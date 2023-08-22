import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateSurroundingDto, CreateSurroundingImageDto, UpdateSurroundingDto } from './surrounding.dto';
import { SurroundingService } from './surrounding.service';

@Controller('surrounding')
export class SurroundingController {
  constructor(private readonly surroundingService: SurroundingService) { }

  @Post('create')
  create(@Body() createSurroundingDto: CreateSurroundingDto) {
    return this.surroundingService.create(createSurroundingDto);
  }


  @Post('image/create')
  createNewImage(@Body() createImageDto: CreateSurroundingImageDto) {
    return this.surroundingService.createNewImage(createImageDto);
  }

  @Get()
  findAll(
    @Query("type") type?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('lan') language?: string,
    @Query('search') searchQuery?: string,
  ) {
    return this.surroundingService.findAll(type, +page || 1, +limit || 6, searchQuery, language);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surroundingService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateSurroundingDto: UpdateSurroundingDto) {
    return this.surroundingService.update(+id, updateSurroundingDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.surroundingService.remove(+id);
  }
}
