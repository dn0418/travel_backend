import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { Reviews } from "../reviews/review.entity";

@Entity()
export class ThingToDo extends CommonEntity {
  @Column()
  isRu: boolean;

  @Column()
  isHy: boolean;

  @Column()
  name: string;

  @Column()
  name_ru: string;

  @Column()
  name_hy: string;

  @Column()
  thumbnail: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  shortDescription_ru: string;

  @Column('text')
  shortDescription_hy: string;

  @Column('text')
  description: string;

  @Column('text')
  description_ru: string;

  @Column('text')
  description_hy: string;

  @Column()
  type: string;

  @Column()
  type_ru: string;

  @Column()
  type_hy: string;

  @Column()
  location: string;

  @Column()
  location_ru: string;

  @Column()
  location_hy: string;

  @Column()
  fromYerevan: string;

  @Column()
  fromYerevan_ru: string;

  @Column()
  fromYerevan_hy: string;

  @Column()
  date: string;

  @Column()
  neatestSettlement: string;

  @Column()
  neatestSettlement_ru: string;

  @Column()
  neatestSettlement_hy: string;

  @Column()
  available: string;

  @Column()
  available_ru: string;

  @Column()
  available_hy: string;

  @Column()
  entrance: string;

  @Column()
  entrance_ru: string;

  @Column()
  entrance_hy: string;

  @OneToMany(() => Images, (image) => image.thingToDo)
  images: Images[];

  @OneToMany(() => Reviews, (review) => review.thingToDo)
  reviews: Reviews[];
}
