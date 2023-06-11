import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Car } from "../car.entity";


@Entity()
export class CarDriver extends CommonEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  location: string;

  @Column()
  profilePhoto: string;

  @Column()
  licenseNo: string;

  @Column()
  locenseExpireDate: string;

  @OneToMany(() => Car, (car) => car.carDriver)
  car: Car;
}
