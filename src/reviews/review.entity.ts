import { Car } from "src/cars/car.entity";
import { CommonEntity } from "src/common/common.entity";
import { Hotels } from "src/hotels/hotel.entity";
import { Tours } from "src/tours/tour.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Reviews extends CommonEntity {

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

  @Column('float')
  rating: number;

  @Column('text')
  message: string;

  @ManyToOne(() => Tours, (tours) => tours.reviews)
  tour: Tours;

  @ManyToOne(() => Car, (car) => car.reviews)
  car: Car;

  @ManyToOne(() => Hotels, (hotel) => hotel.reviews)
  hotel: Hotels;
}