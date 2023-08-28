import { Reviews } from "src/api/reviews/review.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Images } from "../../images/images.entity";
import { PricingWithoutDriver } from "./pricing-without-driver.entity";

@Entity()
export class Car extends CommonEntity {
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
  price: number;

  @Column()
  freeCancellation: string;

  @Column()
  freeCancellation_ru: string;

  @Column()
  freeCancellation_hy: string;

  @Column()
  score: number;

  @Column()
  pickup: string;

  @Column()
  pickup_ru: string;

  @Column()
  pickup_hy: string;

  @Column()
  fuel: string;

  @Column()
  fuel_ru: string;

  @Column()
  fuel_hy: string;

  @Column()
  year: number;

  @Column()
  seatNo: number;

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

  @OneToMany(() => Reviews, (review) => review.car)
  reviews: Reviews[];

  @OneToMany(() => PricingWithoutDriver, (withoutDriver) => withoutDriver.car)
  priceWithoutDriver: PricingWithoutDriver[];

  @OneToMany(() => Images, (image) => image.car)
  images: Images[];
}
