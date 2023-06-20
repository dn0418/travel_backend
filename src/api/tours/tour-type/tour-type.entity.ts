import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Tours } from "../tour.entity";

@Entity()
export class TourType extends CommonEntity {
  @Column()
  name: string;

  @OneToMany(() => Tours, (tour) => tour.tourType)
  tour: Tours[];
}

