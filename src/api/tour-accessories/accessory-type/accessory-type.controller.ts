import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateAccessoryTypeDto, UpdateAccessoryTypeDto } from './accessory-type.dto';
import { AccessoryTypeService } from './accessory-type.service';

@Controller('accessory-type')
export class AccessoryTypeController {
  constructor(private readonly accessoryTypeService: AccessoryTypeService) { }

  @Post('create')
  create(@Body() createAccessoryTypeDto: CreateAccessoryTypeDto) {
    return this.accessoryTypeService.create(createAccessoryTypeDto);
  }

  @Get()
  findAll() {
    return this.accessoryTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoryTypeService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateAccessoryTypeDto: UpdateAccessoryTypeDto) {
    return this.accessoryTypeService.update(+id, updateAccessoryTypeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.accessoryTypeService.remove(+id);
  }
}
