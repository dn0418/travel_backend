import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCallBackDto, UpdateCallBackDto } from './call-back.dto';
import { CallBack } from './call-back.entity';
import { getCallBackMail } from './email';

@Injectable()
export class CallBackService {
  constructor(
    @InjectRepository(CallBack)
    private readonly callbackRepository: Repository<CallBack>,
    private readonly mailerService: MailerService
  ) { }

  async create(createCallBackDto: CreateCallBackDto) {
    const newCallBack = this.callbackRepository.create(createCallBackDto);
    const callBack = await this.callbackRepository.save(newCallBack);

    await this.mailerService.sendMail({
      from: 'abusaid7388@gmail.com',
      subject: 'CallBack - abusaid7388@gmail.com',
      html: getCallBackMail(createCallBackDto),
    });

    return {
      statusCode: 201,
      message: 'CallBack created successfully',
      data: callBack,
    }
  }

  async findAll() {
    const callBacks = await this.callbackRepository.find();

    return {
      statusCode: 200,
      message: 'CallBacks fetched successfully',
      data: callBacks,
    }
  }

  async findOne(id: number) {
    const callBack = await this.callbackRepository.findOne({ where: { id: id } });

    return {
      statusCode: 200,
      message: 'CallBack fetched successfully',
      data: callBack,
    }
  }

  async update(id: number, updateCallBackDto: UpdateCallBackDto) {
    const callBack = await this.callbackRepository.findOne({ where: { id: id } });

    const updatedCallBack = await this.callbackRepository.save({
      ...callBack,
      ...updateCallBackDto,
    });

    return {
      statusCode: 200,
      message: 'CallBack updated successfully',
      data: updatedCallBack,
    }
  }

  async remove(id: number) {
    const callBack = await this.callbackRepository.findOne({ where: { id: id } });

    const deletedCallBack = await this.callbackRepository.remove(callBack);

    return {
      statusCode: 200,
      message: 'CallBack deleted successfully',
      data: deletedCallBack,
    }
  }

  async sendMail() {
    const res = await this.mailerService.sendMail({
      from: 'abusaid7388@gmail.com', // sender address
      subject: 'CallBack - abusaid7388@gmail.com',
      text: 'Welcome to nest mailer module',
      html: `
      <!DOCTYPE html>
<html>
  <body>
    <h1>Callback Request Received</h1>
    <p>You recently received a callback request from: John Doe</p>
    <table>
      <tr>
        <td>Email:</td>
        <td>johndoe@example.com</td>
      </tr>
      <tr>
        <td>Contact:</td>
        <td>ContactInfo</td>
      </tr>
      <tr>
        <td>Phone:</td>
        <td>1234567890</td>
      </tr>
      <tr>
        <td>Whatsapp:</td>
        <td>WhatsappInfo</td>
      </tr>
      <tr>
        <td>Telegram:</td>
        <td>TelegramInfo</td>
      </tr>
      <tr>
        <td>Voice Preference:</td>
        <td>VoiceInfo</td>
      </tr>
      <tr>
        <td>Country:</td>
        <td>USA</td>
      </tr>
      <tr>
        <td>Time Zone:</td>
        <td>GMT-5</td>
      </tr>
      <tr>
        <td>Notes/Special Requests:</td>
        <td>Call Me ASAP</td>
      </tr>
    </table>
    <p>Please contact this individual at your earliest convenience to arrange the callback. We want to ensure they receive timely and efficient service. </p>
  </body>
</html>`,
    });

    return { res };
  }
}

