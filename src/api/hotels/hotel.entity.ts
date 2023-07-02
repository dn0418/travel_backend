import { Images } from "src/api/images/images.entity";
import { Reviews } from "src/api/reviews/review.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { HotelType } from "./hotel-type/hotel-type.entity";

@Entity()
export class Hotels extends CommonEntity {
  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column()
  googleMap: string;

  @Column()
  price: number;

  @Column()
  fromAirport: boolean;

  @Column()
  country: string;

  @Column()
  city: string;

  @ManyToOne(() => HotelType, (hotelType) => hotelType.hotel)
  type: HotelType;

  @Column({ default: true })
  freeCancellation: boolean;

  @Column()
  checkInTime: string;

  @Column()
  checkOutTime: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  longDescription: string;

  @OneToMany(() => Reviews, (review) => review.hotel)
  reviews: Reviews[];

  @OneToMany(() => Images, (image) => image.hotel)
  images: Images[];
}
