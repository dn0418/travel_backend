import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTourServiceDto, UpdateTourServiceDto } from './tour-service.dto';
import { TourServicesService } from './tour-services.service';

@Controller('tour-services')
export class TourServicesController {
  constructor(private readonly tourServicesService: TourServicesService) { }

  @Post()
  create(@Body() createTourServiceDto: CreateTourServiceDto) {
    return this.tourServicesService.create(createTourServiceDto);
  }

  @Get()
  findAll() {
    return this.tourServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourServicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourServiceDto: UpdateTourServiceDto) {
    return this.tourServicesService.update(+id, updateTourServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourServicesService.remove(+id);
  }
}
