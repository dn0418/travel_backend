import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateMiceDto, UpdateMiceDto } from './create-mouse.dto';
import { MiceService } from './mice.service';


@Controller('mice')
export class MiceController {
  constructor(private readonly miceService: MiceService) { }

  @Post('create')
  create(@Body() createMouseDto: CreateMiceDto) {
    return this.miceService.create(createMouseDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery: string,
    @Query('lan') language?: string,
  ) {
    return this.miceService.findAll(+page || 1, +limit || 6, searchQuery || '', language);
  }

  @Get('related')
  findRealated() {
    return this.miceService.findRealated();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.miceService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateMouseDto: UpdateMiceDto) {
    return this.miceService.update(+id, updateMouseDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.miceService.remove(+id);
  }
}
