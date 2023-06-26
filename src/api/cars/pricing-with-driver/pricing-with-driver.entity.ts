import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Car } from "../car.entity";

@Entity()
export class PricingWithDriver extends CommonEntity {
  @Column()
  duration: string;

  @Column()
  price: number;

  @ManyToOne(() => Car, (car) => car.priceWithDriver)
  car: Car;
}
