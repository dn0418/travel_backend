import { Images } from "src/api/images/images.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class AirportTransport extends CommonEntity {
  @Column('text')
  description: string;

  @OneToMany(() => Images, (image) => image.withDriver)
  images: Images[];
}
