import { Hotels } from "src/api/hotels/hotel.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tours } from "../tours/tour.entity";

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

  @ManyToOne(() => Hotels, (hotel) => hotel.images)
  hotel: Hotels;
}