import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class PricingWithDriver extends CommonEntity {
  @Column()
  duration: string;

  @Column()
  price: number;
}
