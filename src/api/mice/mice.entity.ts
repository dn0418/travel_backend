import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { Reviews } from "../reviews/review.entity";

@Entity()
export class Mice extends CommonEntity {
  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  description: string;

  @Column({ default: true })
  freeCancellation: boolean;

  @OneToMany(() => Images, (image) => image.mice)
  images: Images[];

  @OneToMany(() => Reviews, (review) => review.mice)
  reviews: Reviews[];
}
