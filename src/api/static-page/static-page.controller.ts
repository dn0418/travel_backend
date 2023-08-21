import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdateStaticPageDto } from './static-page.dto';
import { StaticPageService } from './static-page.service';

@Controller('static-pages')
export class StaticPageController {
  constructor(private readonly staticPageService: StaticPageService) { }
  @Get()
  findAll() {
    return this.staticPageService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.staticPageService.findOne(code);
  }

  @Put('update')
  update(@Body() updateStaticPageDto: UpdateStaticPageDto) {
    return this.staticPageService.updateOrCreate(updateStaticPageDto);
  }
}
