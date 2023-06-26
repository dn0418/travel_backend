import { Reviews } from "src/api/reviews/review.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { PricingWithDriver } from "./pricing-with-driver/pricing-with-driver.entity";
import { PricingWithoutDriver } from "./pricing-without-driver/pricing-without-driver.entity";

@Entity()
export class Car extends CommonEntity {
  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column()
  model: string;

  @Column()
  carNo: string;

  @Column()
  startedDate: string;

  @Column()
  endDate: string;

  @Column()
  seatNo: number;

  @Column()
  isDriver: boolean;

  @Column()
  description: string;

  @Column()
  year: number;

  @Column()
  price: number;

  @Column()
  discountedPrice: number;

  @OneToMany(() => Reviews, (review) => review.car)
  reviews: Reviews[];

  @OneToMany(() => PricingWithoutDriver, (withoutDriver) => withoutDriver.car)
  priceWithoutDriver: PricingWithoutDriver[];

  @OneToMany(() => PricingWithDriver, (priceWithDriver) => priceWithDriver.car)
  priceWithDriver: PricingWithDriver[];
}
