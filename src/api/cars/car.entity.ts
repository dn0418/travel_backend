import { Reviews } from "src/api/reviews/review.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { PricingWithoutDriver } from "./pricing-without-driver/pricing-without-driver.entity";

@Entity()
export class Car extends CommonEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: true })
  freeCancellation: boolean;

  @Column()
  pickup: string;

  @Column()
  fuel: string;

  @Column()
  year: number;

  @Column()
  seatNo: number;

  @Column()
  thumbnail: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  description: string;

  @OneToMany(() => Reviews, (review) => review.car)
  reviews: Reviews[];

  @OneToMany(() => PricingWithoutDriver, (withoutDriver) => withoutDriver.car)
  priceWithoutDriver: PricingWithoutDriver[];

  @OneToMany(() => Images, (image) => image.car)
  images: Images[];
}
