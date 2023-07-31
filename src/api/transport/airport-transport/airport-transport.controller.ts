import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAirportTransportDto, CreateNewImageDto, UpdateAirportTransportDto } from './airport-transport.dto';
import { AirportTransportService } from './airport-transport.service';

@Controller('airport-transport')
export class AirportTransportController {
  constructor(private readonly airportTransportService: AirportTransportService) { }

  @Post('create')
  create(@Body() createAirportTransportDto: CreateAirportTransportDto) {
    return this.airportTransportService.create(createAirportTransportDto);
  }

  @Post('create/image')
  createNewImage(@Body() createNewImage: CreateNewImageDto) {
    return this.airportTransportService.createNewImage(createNewImage);
  }

  @Get()
  findAll() {
    return this.airportTransportService.findAll();
  }

  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateAirportTransportDto: UpdateAirportTransportDto
  ) {
    return this.airportTransportService.update(+id, updateAirportTransportDto);
  }
}
