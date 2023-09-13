import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Rubric } from "./rubrics/rubric.entity";

@Entity()
export class Blog extends CommonEntity {
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
  author: string;

  @Column()
  author_ru: string;

  @Column()
  author_hy: string;

  @Column()
  short_description: string;

  @Column()
  short_description_ru: string;

  @Column()
  short_description_hy: string;

  @Column()
  description: string;

  @Column()
  description_ru: string;

  @Column()
  description_hy: string;

  @ManyToOne(() => Rubric, (rubric) => rubric.blogs)
  rubric: Rubric;
}
