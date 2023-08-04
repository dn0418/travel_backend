import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateStaticPageDto } from './static-page.dto';
import { StaticPageService } from './static-page.service';

@Controller('static-page')
export class StaticPageController {
  constructor(private readonly staticPageService: StaticPageService) { }
  @Get()
  findAll() {
    return this.staticPageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staticPageService.findOne(+id);
  }

  @Patch('update')
  update(@Body() updateStaticPageDto: UpdateStaticPageDto) {
    return this.staticPageService.updateOrCreate(updateStaticPageDto);
  }
}
