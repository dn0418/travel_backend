import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCallBackDto, UpdateCallBackDto } from './call-back.dto';
import { CallBackService } from './call-back.service';

@Controller('call-back')
export class CallBackController {
  constructor(private readonly callBackService: CallBackService) { }

  @Post('create')
  create(@Body() createCallBackDto: CreateCallBackDto) {
    return this.callBackService.create(createCallBackDto);
  }

  @Get()
  findAll(@Query('page') page?: string) {
    return this.callBackService.findAll(+page || 1);
  }

  @Get('mail')
  sendMail() {
    return this.callBackService.sendMail();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callBackService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCallBackDto: UpdateCallBackDto) {
    return this.callBackService.update(+id, updateCallBackDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.callBackService.remove(+id);
  }
}
