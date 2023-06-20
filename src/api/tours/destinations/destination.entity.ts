import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Tours } from "../tour.entity";

@Entity()
export class Destinations extends CommonEntity {
  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  mapImage: string;

  @OneToMany(() => Tours, (tour) => tour.destination)
  tour: Tours[];
}
