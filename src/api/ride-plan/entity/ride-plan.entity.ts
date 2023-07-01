import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { RideDestination } from "./ride-destination.entity";

@Entity()
export class RidePlan extends CommonEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  date: string;

  @Column()
  adult: number;

  @Column()
  child: number;

  @Column()
  rideType: string;

  @Column('text')
  note: string;

  @OneToMany(() => RideDestination, destination => destination.ridePlan)
  destination: RideDestination[];
}
