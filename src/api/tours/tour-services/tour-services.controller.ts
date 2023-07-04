import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTourServiceDto, UpdateTourServiceDto } from './tour-service.dto';
import { TourServicesService } from './tour-services.service';

@Controller('tour-services')
export class TourServicesController {
  constructor(private readonly tourServicesService: TourServicesService) { }

  @Post('create')
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

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateTourServiceDto: UpdateTourServiceDto) {
    return this.tourServicesService.update(+id, updateTourServiceDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.tourServicesService.remove(+id);
  }
}
