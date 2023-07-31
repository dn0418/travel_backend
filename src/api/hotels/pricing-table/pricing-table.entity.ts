import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Hotels } from "../hotel.entity";

@Entity()
export class PricingTable extends CommonEntity {
  @Column()
  name: string;

  @Column()
  name_ru: string;

  @Column()
  name_hy: string;

  @Column()
  firstPart: number;

  @Column()
  lastPart: number;

  @ManyToOne(() => Hotels, (hotel) => hotel.pricingTable)
  hotel: Hotels;
}
