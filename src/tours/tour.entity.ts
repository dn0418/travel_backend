import { Reviews } from 'src/reviews/review.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tours {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => Reviews, review => review.tour, {
    eager: true,
  })
  tour_reviews: Reviews[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}