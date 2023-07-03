import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { Reviews } from "../reviews/review.entity";
import { AccessoriesPricing } from "./accessories-pricing/accessories-pricing.entity";
import { AccessoryType } from "./accessory-type/accessory-type.entity";

@Entity()
export class TourAccessory extends CommonEntity {
  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  perPax: string;

  @ManyToOne(() => AccessoryType, (accessoryType) => accessoryType.accessory)
  type: AccessoryType;

  @Column({ default: true })
  freeCancellation: boolean;

  @Column()
  rentFrom: string;

  @Column({ nullable: true })
  available: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  longDescription: string;

  @OneToMany(() => Reviews, (review) => review.accessory)
  reviews: Reviews[];

  @OneToMany(() => Images, (image) => image.accessory)
  images: Images[];

  @OneToMany(() => AccessoriesPricing, (pricing) => pricing.accessory)
  pricing: AccessoriesPricing[];
}
