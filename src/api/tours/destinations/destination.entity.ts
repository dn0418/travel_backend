import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Tours } from "../tour.entity";

@Entity()
export class Destinations extends CommonEntity {
  @Column()
  name: string;

  @Column()
  name_ru: string;

  @Column()
  name_hy: string;

  @Column()
  country: string;

  @Column()
  country_ru: string;

  @Column()
  country_hy: string;

  @OneToMany(() => Tours, (tour) => tour.destination)
  tour: Tours[];
}
