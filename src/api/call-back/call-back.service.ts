import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCallBackDto, UpdateCallBackDto } from './call-back.dto';
import { CallBack } from './call-back.entity';

@Injectable()
export class CallBackService {
  constructor(
    @InjectRepository(CallBack)
    private readonly callbackRepository: Repository<CallBack>,
  ) { }

  async create(createCallBackDto: CreateCallBackDto) {
    const newCallBack = this.callbackRepository.create(createCallBackDto);
    const callBack = await this.callbackRepository.save(newCallBack);

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
}
