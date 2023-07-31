import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RideDestination } from './entity/ride-destination.entity';
import { RidePlan } from './entity/ride-plan.entity';
import { CreateRidePlanDto, UpdateRidePlanDto } from './ride-plan.dto';


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
      status: 201,
      message: 'RidePlan created successfully',
      data: ridePlan,
    }
  }

  async findAll(page: number) {
    const skip = (+page - 1) * 20;
    const ridePlans = await this.ridePlanRepository.find({
      relations: ['destination'],
      skip: skip,
      take: 20,
      order: {
        id: 'DESC'
      }
    });

    return {
      status: 200,
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
      status: 200,
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
      relations: ['destination'],
    });

    if (ridePlan.destination.length > 0) {
      await Promise.all(
        ridePlan.destination.map(async (item) => {
          await this.rideDestinationRepository.remove(item);
        }),
      );
    }

    if (ridePlan) {
      await this.ridePlanRepository.delete(id);
    }

    return {
      status: 200,
      message: 'RidePlan deleted successfully',
      data: ridePlan,
    }
  }
}
