import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { Reviews } from "../reviews/review.entity";

@Entity()
export class Mice extends CommonEntity {
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
  comportable: string;

  @Column()
  comportable_ru: string;

  @Column()
  comportable_hy: string;

  @Column()
  activities: string;

  @Column()
  activities_ru: string;

  @Column()
  activities_hy: string;

  @Column()
  extra: string;

  @Column()
  extra_ru: string;

  @Column()
  extra_hy: string;

  @Column()
  access24: boolean;

  @Column({ default: true })
  freeCancellation: boolean;

  @OneToMany(() => Images, (image) => image.mice)
  images: Images[];

  @OneToMany(() => Reviews, (review) => review.mice)
  reviews: Reviews[];
}
