import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateHotelTypeDto, UpdateHotelTypeDto } from './hotel-type.dto';
import { HotelTypeService } from './hotel-type.service';

@Controller('hotel-type')
export class HotelTypeController {
  constructor(private readonly hotelTypeService: HotelTypeService) { }

  @Post('create')
  create(@Body() createHotelTypeDto: CreateHotelTypeDto) {
    return this.hotelTypeService.create(createHotelTypeDto);
  }

  @Get()
  findAll() {
    return this.hotelTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelTypeService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateHotelTypeDto: UpdateHotelTypeDto) {
    return this.hotelTypeService.update(+id, updateHotelTypeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.hotelTypeService.remove(+id);
  }
}
