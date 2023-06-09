import { CommonEntity } from "src/common/common.entity";
import { Tours } from "src/tours/tour.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Reviews extends CommonEntity {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  location: string;

  @Column()
  profilePhoto: string;

  @Column('float')
  rating: number;

  @Column('text')
  message: string;

  @ManyToOne(() => Tours, (tours) => tours.reviews)
  tour: Tours;
}