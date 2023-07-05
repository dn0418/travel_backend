import { Images } from "src/api/images/images.entity";
import { Reviews } from "src/api/reviews/review.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { HotelType } from "./hotel-type/hotel-type.entity";
import { PricingTable } from "./pricing-table/pricing-table.entity";

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

  @Column({ nullable: true })
  fromAirport: boolean;

  @Column()
  country: string;

  @Column()
  city: string;

  @ManyToOne(() => HotelType, (hotelType) => hotelType.hotel)
  type: HotelType;

  @Column({ default: true })
  freeCancellation: boolean;

  @Column({ nullable: true })
  checkInTime: string;

  @Column({ nullable: true })
  checkOutTime: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  longDescription: string;

  @OneToMany(() => Reviews, (review) => review.hotel)
  reviews: Reviews[];

  @OneToMany(() => PricingTable, (pricingTable) => pricingTable.hotel)
  pricingTable: PricingTable[];

  @OneToMany(() => Images, (image) => image.hotel)
  images: Images[];
}
