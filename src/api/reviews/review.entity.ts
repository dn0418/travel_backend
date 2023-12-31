import { Hotels } from "src/api/hotels/hotel.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { FoodAndDrink } from "../food-and-drinks/food-and-drink.entity";
import { Mice } from "../mice/mice.entity";
import { Surrounding } from "../surrounding/surrounding.entity";
import { ThingToDo } from "../thing-to-do/thing-to-do.entity";
import { ThingToSee } from "../thing-to-see/thing-to-see.entity";
import { TourAccessory } from "../tour-accessories/tour-accessory.entity";
import { Tours } from "../tours/tour.entity";
import { Car } from "../transport/without-driver/without-driver.entity";

@Entity()
export class Reviews extends CommonEntity {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
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

  @ManyToOne(() => Surrounding, (surrounding) => surrounding.reviews)
  surrounding: Surrounding;

  @ManyToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.reviews)
  foodAndDrink: FoodAndDrink;

  @ManyToOne(() => Mice, (mice) => mice.reviews)
  mice: Mice;
}