import { Hotels } from "src/api/hotels/hotel.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Car } from "../cars/car.entity";
import { Tours } from "../tours/tour.entity";

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