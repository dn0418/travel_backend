import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { Reviews } from "../reviews/review.entity";

@Entity()
export class ThingToSee extends CommonEntity {
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
  date: string;

  @Column()
  neatestSettlement: string;

  @Column()
  available: string;

  @Column()
  entrance: string;

  @OneToMany(() => Images, (image) => image.thingToSee)
  images: Images[];

  @OneToMany(() => Reviews, (review) => review.hotel)
  reviews: Reviews[];
}
