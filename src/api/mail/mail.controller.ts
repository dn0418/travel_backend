import { Body, Controller, Post } from '@nestjs/common';
import { AccessoriesMailDto, CarMailDto, HotelMailDto, MiceMailDto, TourMailDto } from './mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Post('tour')
  sendTourMail(@Body() createMailDto: TourMailDto) {
    return this.mailService.sendTourMail(createMailDto);
  }

  @Post('hotel')
  sendHotelMail(@Body() createMailDto: HotelMailDto) {
    return this.mailService.sendHotelMail(createMailDto);
  }

  @Post('car')
  sendTransportMail(@Body() createMailDto: CarMailDto) {
    return this.mailService.sendTransportMail(createMailDto);
  }

  @Post('accessories')
  sendAccessoriesMail(@Body() createMailDto: AccessoriesMailDto) {
    return this.mailService.sendAccessoriesMail(createMailDto);
  }

  @Post('mice')
  sendMiceMail(@Body() createMailDto: MiceMailDto) {
    return this.mailService.sendMiceMail(createMailDto);
  }
}
