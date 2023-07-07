import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { Reviews } from "../reviews/review.entity";

@Entity()
export class FoodAndDrink extends CommonEntity {
  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  description: string;

  @Column()
  type: string;

  @Column()
  location: string;

  @Column()
  fromYerevan: string;

  @Column()
  address: string;

  @Column()
  neatestSettlement: string;

  @Column()
  vegan: string;

  @Column()
  entrance: string;

  @OneToMany(() => Images, (image) => image.foodAndDrink)
  images: Images[];

  @OneToMany(() => Reviews, (review) => review.foodAndDrink)
  reviews: Reviews[];
}
