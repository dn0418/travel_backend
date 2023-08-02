import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AccessoriesMailDto, CarMailDto, HotelMailDto, MiceMailDto, TourMailDto } from './mail.dto';
import { getAccessoriesTemplate } from './template/accessories-template';
import { getCarTemplate } from './template/car-template';
import { getHotelTemplate } from './template/hotel-template';
import { getMiceTemplate } from './template/mice-template';
import { getTourTemplate } from './template/tour-template';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
  ) { }


  async sendTourMail(tourMailDto: TourMailDto) {
    const res = await this.mailerService.sendMail({
      from: tourMailDto.email,
      subject: `Tour Request - ${tourMailDto.email}`,
      html: getTourTemplate(tourMailDto),
    });

    if (res.messageId) {
      return {
        status: 200,
        message: 'Your tour request has been sent successfully!'
      }
    } else {
      throw new InternalServerErrorException('Something went wrong');
    };
  }

  async sendHotelMail(hotelMailData: HotelMailDto) {
    const res = await this.mailerService.sendMail({
      from: hotelMailData.email,
      subject: `Hotel Request - ${hotelMailData.email}`,
      html: getHotelTemplate(hotelMailData),
    });

    if (res.messageId) {
      return {
        status: 200,
        message: 'Your hotel request has been sent successfully!'
      }
    } else {
      throw new InternalServerErrorException('Something went wrong');
    };
  }

  async sendTransportMail(mailData: CarMailDto) {
    const res = await this.mailerService.sendMail({
      from: mailData.email,
      subject: `Transport Request - ${mailData.email}`,
      html: getCarTemplate(mailData),
    });

    if (res.messageId) {
      return {
        status: 200,
        message: 'Your transport request has been sent successfully!'
      }
    } else {
      throw new InternalServerErrorException('Something went wrong');
    };
  }

  async sendAccessoriesMail(mailData: AccessoriesMailDto) {
    const res = await this.mailerService.sendMail({
      from: mailData.email,
      subject: `Accessories Request - ${mailData.email}`,
      html: getAccessoriesTemplate(mailData),
    });

    if (res.messageId) {
      return {
        status: 200,
        message: 'Your accessories request has been sent successfully!'
      }
    } else {
      throw new InternalServerErrorException('Something went wrong');
    };
  }

  async sendMiceMail(mailData: MiceMailDto) {
    const res = await this.mailerService.sendMail({
      from: mailData.email,
      subject: `Mice Request - ${mailData.email}`,
      html: getMiceTemplate(mailData),
    });

    if (res.messageId) {
      return {
        status: 200,
        message: 'Your mice request has been sent successfully!'
      }
    } else {
      throw new InternalServerErrorException('Something went wrong');
    };
  }
}
