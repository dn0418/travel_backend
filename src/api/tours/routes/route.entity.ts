export class Route { }
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Tours } from "../tour.entity";

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