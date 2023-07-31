export class Route { }
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Tours } from "../tour.entity";

@Entity()
export class Routes extends CommonEntity {
  @Column()
  title: string;

  @Column()
  title_ru: string;

  @Column()
  title_hy: string;

  @Column('text')
  description: string;

  @Column('text')
  description_ru: string;

  @Column('text')
  description_hy: string;

  @Column()
  time: string;

  @Column()
  time_ru: string;

  @Column()
  time_hy: string;

  @Column()
  distance: string;

  @Column()
  distance_ru: string;

  @Column()
  distance_hy: string;

  @Column()
  meals: string;

  @Column()
  meals_ru: string;

  @Column()
  meals_hy: string;

  @Column()
  hotel: string;

  @Column()
  hotel_ru: string;

  @Column()
  hotel_hy: string;

  @ManyToOne(() => Tours, (tours) => tours.routes)
  tour: Tours;
}