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
  country: string;

  @Column()
  city: string;

  @Column()
  quality: string;

  @Column()
  roomsDetails: string;

  @Column()
  date: string;

  @Column('text')
  hotelDetails: string;

  @Column()
  locationImg: string;

  @ManyToOne(() => HotelType, (hotelType) => hotelType.hotel)
  type: HotelType;

  @Column()
  price: number;

  @Column()
  discountedPrice: number;

  @Column()
  thumbnail: string;

  @Column()
  activities: number;

  @OneToMany(() => Reviews, (review) => review.hotel)
  reviews: Reviews[];

  @OneToMany(() => Images, (image) => image.hotel)
  images: Images[];
}
