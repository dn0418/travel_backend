import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Tours } from "../tour.entity";

@Entity()
export class IndividualPricing extends CommonEntity {
  @Column()
  pax2_3: number;

  @Column()
  pax4_6: number;

  @Column()
  pax7_18: number;

  @Column()
  pax20_more: number;

  @ManyToOne(() => Tours, (tours) => tours.individualPricing)
  tour: Tours;
}
