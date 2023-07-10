import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Car } from "./without-driver.entity";

@Entity()
export class PricingWithoutDriver extends CommonEntity {
  @Column()
  destination: string;

  @Column()
  sedan_3seat: number;

  @Column()
  minivan_7seat: number;

  @Column()
  minibus_18seat: number;

  @Column()
  bus_35seat: number;

  @ManyToOne(() => Car, (car) => car.priceWithoutDriver)
  car: Car;
}
