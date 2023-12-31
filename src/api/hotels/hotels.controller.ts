import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateHotelDto, CreateHotelImageDto, UpdateHotelDto } from './hotels.dto';
import { HotelsService } from './hotels.service';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) { }

  @Post('create')
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto);
  }

  @Post('image/create')
  createNewImage(@Body() createImageDto: CreateHotelImageDto) {
    return this.hotelsService.createNewImage(createImageDto);
  }

  @Get()
  findAll(
    @Query("country") country?: string,
    @Query("city") city?: string,
    @Query("type") type?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') searchQuery?: string,
    @Query('lan') language?: string,
  ) {
    return this.hotelsService.findAll(country, city, type, +page || 1, +limit || 6, searchQuery, language);
  }

  @Get('related')
  findRealated() {
    return this.hotelsService.findRealated();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id);
  }
}
