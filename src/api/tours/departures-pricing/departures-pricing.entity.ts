import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Tours } from "../tour.entity";

@Entity()
export class DeparturesPricing extends CommonEntity {
  @Column()
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @Column()
  maxPerson: number;

  @Column()
  price: number;

  @ManyToOne(() => Tours, (tours) => tours.departuresPricing)
  tour: Tours;
}
