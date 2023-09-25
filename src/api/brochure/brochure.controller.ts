import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateBrochureDto, UpdateBrochureDto } from './brochure.dto';
import { BrochureService } from './brochure.service';

@Controller('brochure')
export class BrochureController {
  constructor(private readonly brochureService: BrochureService) { }

  @Post('create')
  create(@Body() createBrochureDto: CreateBrochureDto) {
    return this.brochureService.create(createBrochureDto);
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('lan') language?: string,
    @Query('search') searchQuery?: string,
  ) {
    return this.brochureService.findAll(+page || 1, searchQuery, language);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brochureService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateBrochureDto: UpdateBrochureDto) {
    return this.brochureService.update(+id, updateBrochureDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.brochureService.remove(+id);
  }
}
