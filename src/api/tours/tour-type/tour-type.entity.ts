import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class TourType extends CommonEntity {
  @Column()
  name: string;

  // @OneToMany(() => Tours, (tour) => tour.tourType)
  // tour: Tours[];
}

