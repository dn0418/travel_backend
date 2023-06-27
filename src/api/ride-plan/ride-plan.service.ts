import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RideDestination } from './ride-destination.entity';
import { CreateRidePlanDto, UpdateRidePlanDto } from './ride-plan.dto';
import { RidePlan } from './ride-plan.entity';


@Injectable()
export class RidePlanService {
  constructor(
    @InjectRepository(RidePlan)
    private readonly ridePlanRepository: Repository<RidePlan>,

    @InjectRepository(RideDestination)
    private readonly rideDestinationRepository: Repository<RideDestination>,
  ) { }

  async create(createRidePlanDto: CreateRidePlanDto) {
    const { destinations, ...ridePlanData } = createRidePlanDto;
    const newRidePlan = this.ridePlanRepository.create(ridePlanData);
    const ridePlan = await this.ridePlanRepository.save(newRidePlan);

    if (destinations.length > 0) {
      destinations.map(async (destination) => {
        const newDestinations = this.rideDestinationRepository.create(
          { ...destination, ridePlan: ridePlan }
        );

        await this.rideDestinationRepository.save(newDestinations);
      });
    }

    return {
      statusCode: 201,
      message: 'RidePlan created successfully',
      data: ridePlan,
    }
  }

  async findAll() {
    const ridePlans = await this.ridePlanRepository.find({
      relations: ['destination'],
    });

    return {
      statusCode: 200,
      message: 'RidePlans retrieved successfully',
      data: ridePlans,
    }
  }

  async findOne(id: number) {
    const ridePlan = await this.ridePlanRepository.findOne({
      where: { id },
      relations: ['destination'],
    });

    return {
      statusCode: 200,
      message: 'RidePlan retrieved successfully',
      data: ridePlan,
    }
  }

  async update(id: number, updateRidePlanDto: UpdateRidePlanDto) {
    return `This action updates a #${id} ridePlan`;
  }

  async remove(id: number) {
    const ridePlan = await this.ridePlanRepository.findOne({
      where: { id },
    });

    if (ridePlan) {
      await this.ridePlanRepository.delete(id);
    }

    return {
      statusCode: 200,
      message: 'RidePlan deleted successfully',
      data: ridePlan,
    }
  }
}
