import { Hotels } from "src/api/hotels/hotel.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { TourAccessory } from "../tour-accessories/tour-accessory.entity";
import { Tours } from "../tours/tour.entity";

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
}