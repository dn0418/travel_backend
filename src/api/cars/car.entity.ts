import { Reviews } from "src/api/reviews/review.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CarDriver } from "./car-drivers/car-driver.entity";

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
  price: number;

  @Column()
  discountedPrice: number;

  @ManyToOne(() => CarDriver, (carDriver) => carDriver.car)
  carDriver: CarDriver;

  @OneToMany(() => Reviews, (review) => review.car)
  reviews: Reviews[];
}
