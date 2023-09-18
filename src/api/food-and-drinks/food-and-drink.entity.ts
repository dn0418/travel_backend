import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { Reviews } from "../reviews/review.entity";

@Entity()
export class FoodAndDrink extends CommonEntity {
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
  maps: string;

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
  fromYerevan: string;

  @Column()
  fromYerevan_ru: string;

  @Column()
  fromYerevan_hy: string;

  @Column()
  address: string;

  @Column()
  address_ru: string;

  @Column()
  address_hy: string;

  @Column()
  neatestSettlement: string;

  @Column()
  neatestSettlement_ru: string;

  @Column()
  neatestSettlement_hy: string;

  @Column()
  vegan: string;

  @Column()
  vegan_ru: string;

  @Column()
  vegan_hy: string;

  @Column()
  entrance: string;

  @Column()
  entrance_ru: string;

  @Column()
  entrance_hy: string;

  @OneToMany(() => Images, (image) => image.foodAndDrink)
  images: Images[];

  @OneToMany(() => Reviews, (review) => review.foodAndDrink)
  reviews: Reviews[];
}
