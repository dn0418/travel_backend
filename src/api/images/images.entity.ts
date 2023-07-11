import { Hotels } from "src/api/hotels/hotel.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { FoodAndDrink } from "../food-and-drinks/food-and-drink.entity";
import { ThingToDo } from "../thing-to-do/thing-to-do.entity";
import { ThingToSee } from "../thing-to-see/thing-to-see.entity";
import { TourAccessory } from "../tour-accessories/tour-accessory.entity";
import { Tours } from "../tours/tour.entity";
import { AirportTransport } from "../transport/airport-transport/airport-transport.entity";
import { WithDriver } from "../transport/with-driver/with-driver.entity";
import { Car } from "../transport/without-driver/without-driver.entity";

@Entity()
export class Images extends CommonEntity {
  @Column()
  url: string;

  @ManyToOne(() => Tours, tour => tour.images)
  tour: Tours;

  @ManyToOne(() => Hotels, (hotel) => hotel.images)
  hotel: Hotels;

  @ManyToOne(() => TourAccessory, (accessory) => accessory.images)
  accessory: TourAccessory;

  @ManyToOne(() => ThingToSee, (thingToSee) => thingToSee.images)
  thingToSee: ThingToSee;

  @ManyToOne(() => ThingToDo, (thingToDo) => thingToDo.images)
  thingToDo: ThingToDo;

  @ManyToOne(() => FoodAndDrink, (foodAndDrink) => foodAndDrink.images)
  foodAndDrink: FoodAndDrink;

  @ManyToOne(() => Car, (car) => car.images)
  car: Car;

  @ManyToOne(() => WithDriver, (withDriver) => withDriver.images)
  withDriver: WithDriver;

  @ManyToOne(() => AirportTransport, (airportTransport) => airportTransport.images)
  airportTransport: AirportTransport;
}