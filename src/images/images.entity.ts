import { CommonEntity } from "src/common/common.entity";
import { Tours } from "src/tours/tour.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Images extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  minUrl: string;

  @ManyToOne(() => Tours, tour => tour.images)
  tour: Tours;
}