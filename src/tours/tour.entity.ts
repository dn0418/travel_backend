import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column()
  tourDetails: string;

  @Column()
  thumbnail: string;

  @Column('simple-array')
  images: string[];

  @Column('simple-array')
  includesServices: string[];

  @Column('simple-array')
  excludeServices: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}