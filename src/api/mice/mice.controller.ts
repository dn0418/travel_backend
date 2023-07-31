import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMiceDto, UpdateMiceDto } from './create-mouse.dto';
import { MiceService } from './mice.service';


@Controller('mice')
export class MiceController {
  constructor(private readonly miceService: MiceService) { }

  @Post()
  create(@Body() createMouseDto: CreateMiceDto) {
    return this.miceService.create(createMouseDto);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') searchQuery: string,
  ) {
    return this.miceService.findAll(+page || 1, +limit || 6, searchQuery || '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.miceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMouseDto: UpdateMiceDto) {
    return this.miceService.update(+id, updateMouseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.miceService.remove(+id);
  }
}
