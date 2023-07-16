import { Images } from "src/api/images/images.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class AirportTransport extends CommonEntity {
  @Column('text')
  description: string;

  @Column('text')
  description_hy: string;

  @Column('text')
  description_ru: string;

  @OneToMany(() => Images, (image) => image.airportTransport)
  images: Images[];
}
