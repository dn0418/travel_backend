import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
  findAll() {
    return this.callBackService.findAll();
  }

  @Get('mail')
  sendMail() {
    return this.callBackService.sendMail();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callBackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCallBackDto: UpdateCallBackDto) {
    return this.callBackService.update(+id, updateCallBackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callBackService.remove(+id);
  }
}
