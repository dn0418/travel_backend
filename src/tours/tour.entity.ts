import { CommonEntity } from 'src/common/common.entity';
import { Reviews } from 'src/reviews/review.entity';
import { Routes } from 'src/routes/route.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Tours extends CommonEntity {
  @Column()
  title: string;

  @Column()
  destination: string;

  @Column()
  price: number;

  @Column()
  discountedPrice: number;

  @Column()
  dayLength: number;

  @Column()
  nightLength: number;

  @Column()
  tourType: string;

  @Column()
  startedDate: string;

  @Column()
  endDate: string;

  @Column()
  activities: number;

  @Column()
  car: boolean;

  @Column()
  hiking: boolean;

  @Column()
  motorCycle: boolean;

  @Column()
  hotel: number;

  @Column()
  hotelDetails: string;

  @Column()
  locationImg: string;

  @Column('text')
  tourDetails: string;

  @Column()
  thumbnail: string;

  @Column('simple-array')
  images: string[];

  @Column('simple-array')
  includesServices: string[];

  @Column('simple-array')
  excludeServices: string[];

  @OneToMany(() => Reviews, (review) => review.tour)
  reviews: Reviews[];

  @OneToMany(() => Routes, (routes) => routes.tour)
  routes: Routes[];
}