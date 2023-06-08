import { CommonEntity } from "src/common/common.entity";
import { Tours } from "src/tours/tour.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Routes extends CommonEntity {
  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  time: string;

  @Column()
  length: string;

  @Column()
  meals: string;

  @Column()
  hotel: string;

  @ManyToOne(() => Tours, (tours) => tours.routes)
  tour: Tours;
}