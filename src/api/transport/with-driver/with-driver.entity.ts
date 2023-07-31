import { Images } from "src/api/images/images.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { PricingWithDriver } from "./pricing-with-driver.entity";

@Entity()
export class WithDriver extends CommonEntity {
  @Column()
  title: string;

  @Column()
  title_ru: string;

  @Column()
  title_hy: string;

  @Column('text')
  description: string;

  @Column('text')
  description_ru: string;

  @Column('text')
  description_hy: string;

  @OneToMany(() => PricingWithDriver, (pricing) => pricing.car)
  pricing: PricingWithDriver[];

  @OneToMany(() => Images, (image) => image.withDriver)
  images: Images[];
}
