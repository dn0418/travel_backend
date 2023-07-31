import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { TourAccessory } from "../tour-accessory.entity";

@Entity()
export class AccessoryType extends CommonEntity {
  @Column()
  name: string;

  @Column()
  name_ru: string;

  @Column()
  name_hy: string;

  @OneToMany(() => TourAccessory, (accessory) => accessory.type)
  accessory: TourAccessory[];
}
