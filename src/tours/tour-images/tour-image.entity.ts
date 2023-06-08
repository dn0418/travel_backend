import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tours } from "../tour.entity";

@Entity()
export class TourImages extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  minUrl: string;

  @ManyToOne(() => Tours, tour => tour.images)
  tour: Tours;
}