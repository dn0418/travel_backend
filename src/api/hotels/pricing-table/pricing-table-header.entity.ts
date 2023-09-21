import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotels } from "../hotel.entity";

@Entity('pricing-table-header')
export class PricingTableHeader extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstPart: string;

  @Column()
  lastPart: string;
}
