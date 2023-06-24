import { Reviews } from "src/api/reviews/review.entity";
import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Car extends CommonEntity {
  @Column()
  name: string;

  @Column()
  thumbnail: string;

  @Column()
  model: string;

  @Column()
  carNo: string;

  @Column()
  startedDate: string;

  @Column()
  endDate: string;

  @Column()
  seatNo: number;

  @Column()
  isDriver: boolean;

  @Column()
  description: string;

  @Column()
  year: number;

  @Column()
  price: number;

  @Column()
  discountedPrice: number;

  @OneToMany(() => Reviews, (review) => review.car)
  reviews: Reviews[];
}
