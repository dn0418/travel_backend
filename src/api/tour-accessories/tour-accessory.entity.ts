import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Images } from "../images/images.entity";
import { Reviews } from "../reviews/review.entity";
import { AccessoryType } from "./accessory-type/accessory-type.entity";

@Entity()
export class TourAccessory extends CommonEntity {
  @Column()
  title: string;

  @Column()
  price: number;

  @ManyToOne(() => AccessoryType, (accessoryType) => accessoryType.accessory)
  type: AccessoryType;

  @Column()
  specification: string;

  @Column('text')
  goodsDetails: string;

  @Column()
  thumbnail: string;

  @Column()
  isAvailable: boolean;

  @OneToMany(() => Reviews, (review) => review.accessory)
  reviews: Reviews[];

  @OneToMany(() => Images, (image) => image.accessory)
  images: Images[];
}
