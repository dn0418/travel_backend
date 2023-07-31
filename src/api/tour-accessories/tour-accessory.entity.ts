import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { Reviews } from "../reviews/review.entity";
import { AccessoriesPricing } from "./accessories-pricing/accessories-pricing.entity";
import { AccessoryType } from "./accessory-type/accessory-type.entity";

@Entity()
export class TourAccessory extends CommonEntity {
  @Column()
  isRu: boolean;

  @Column()
  isHy: boolean;

  @Column()
  title: string;

  @Column()
  title_ru: string;

  @Column()
  title_hy: string;

  @Column()
  thumbnail: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  perPax: string;

  @Column({ nullable: true })
  perPax_ru: string;

  @Column({ nullable: true })
  perPax_hy: string;

  @ManyToOne(() => AccessoryType, (accessoryType) => accessoryType.accessory)
  type: AccessoryType;

  @Column({ default: true })
  freeCancellation: boolean;

  @Column()
  rentFrom: string;

  @Column()
  rentFrom_ru: string;

  @Column()
  rentFrom_hy: string;

  @Column({ nullable: true })
  available: string;

  @Column({ nullable: true })
  available_ru: string;

  @Column({ nullable: true })
  available_hy: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  shortDescription_ru: string;

  @Column('text')
  shortDescription_hy: string;

  @Column('text')
  longDescription: string;

  @Column('text')
  longDescription_ru: string;

  @Column('text')
  longDescription_hy: string;

  @OneToMany(() => Reviews, (review) => review.accessory)
  reviews: Reviews[];

  @OneToMany(() => Images, (image) => image.accessory)
  images: Images[];

  @OneToMany(() => AccessoriesPricing, (pricing) => pricing.accessory)
  pricing: AccessoriesPricing[];
}
