import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Tours } from "../tour.entity";

@Entity()
export class TourServices extends CommonEntity {
  @Column('text')
  text: string;

  @Column('text')
  text_ru: string;

  @Column('text')
  text_hy: string;

  @Column({ enum: ['include', 'exclude'] })
  type: string;

  @ManyToOne(() => Tours, (tours) => tours.id)
  tour: Tours;
}