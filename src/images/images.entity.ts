import { Car } from "src/cars/car.entity";
import { CommonEntity } from "src/common/common.entity";
import { Hotels } from "src/hotels/hotel.entity";
import { Tours } from "src/tours/tour.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Images extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  minUrl: string;

  @ManyToOne(() => Tours, tour => tour.images)
  tour: Tours;

  @ManyToOne(() => Car, (car) => car.images)
  car: Car;

  @ManyToOne(() => Hotels, (hotel) => hotel.images)
  hotel: Hotels;
}