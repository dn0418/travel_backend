import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Blog } from "../blog.entity";

@Entity()
export class Rubric extends CommonEntity {
  @Column()
  name: string;

  @Column()
  name_ru: string;

  @Column()
  name_hy: string;

  @OneToMany(() => Blog, (blogs) => blogs.rubric)
  blogs: Blog[];
}
