import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { RidePlan } from "./ride-plan.entity";

@Entity()
export class RideDestination extends CommonEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  duration: string;

  @ManyToOne(() => RidePlan, (ridePlan) => ridePlan.destination)
  ridePlan: RidePlan;
}
