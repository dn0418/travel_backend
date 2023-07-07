import { Hotels } from "src/api/hotels/hotel.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Car } from "../cars/car.entity";
import { ThingToDo } from "../thing-to-do/thing-to-do.entity";
import { ThingToSee } from "../thing-to-see/thing-to-see.entity";
import { TourAccessory } from "../tour-accessories/tour-accessory.entity";
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

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => Tours, (tours) => tours.reviews)
  tour: Tours;

  @ManyToOne(() => Car, (car) => car.reviews)
  car: Car;

  @ManyToOne(() => Hotels, (hotel) => hotel.reviews)
  hotel: Hotels;

  @ManyToOne(() => TourAccessory, (accessory) => accessory.reviews)
  accessory: TourAccessory;

  @ManyToOne(() => ThingToSee, (thingToSee) => thingToSee.reviews)
  thingToSee: ThingToSee;

  @ManyToOne(() => ThingToDo, (thingToDo) => thingToDo.reviews)
  thingToDo: ThingToDo;
}