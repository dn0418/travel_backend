import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAirportTransportDto, UpdateAirportTransportDto } from './airport-transport.dto';
import { AirportTransportService } from './airport-transport.service';

@Controller('airport-transport')
export class AirportTransportController {
  constructor(private readonly airportTransportService: AirportTransportService) { }

  @Post('create')
  create(@Body() createAirportTransportDto: CreateAirportTransportDto) {
    return this.airportTransportService.create(createAirportTransportDto);
  }

  @Get()
  findAll() {
    return this.airportTransportService.findAll();
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateAirportTransportDto: UpdateAirportTransportDto
  ) {
    return this.airportTransportService.update(+id, updateAirportTransportDto);
  }
}
