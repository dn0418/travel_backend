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

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  date: string;

  @Column({ nullable: true })
  adult: number;

  @Column({ nullable: true })
  child: number;

  @Column({ nullable: true })
  rideType: string;

  @Column('text', { nullable: true })
  note: string;

  @OneToMany(() => RideDestination, destination => destination.ridePlan)
  destination: RideDestination[];
}
