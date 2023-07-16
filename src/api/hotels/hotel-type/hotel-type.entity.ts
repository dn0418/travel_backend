import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Hotels } from "../hotel.entity";

@Entity()
export class HotelType extends CommonEntity {
  @Column()
  name: string;

  @Column()
  name_ru: string;

  @Column()
  name_hy: string;

  @OneToMany(() => Hotels, (hotel) => hotel.type)
  hotel: Hotels[];
}
