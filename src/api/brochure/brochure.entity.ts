import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Brochure extends CommonEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  title_ru: string;

  @Column({ nullable: true })
  title_hy: string;

  @Column()
  url: string;
}
