import { CommonEntity } from 'src/common/common.entity';
import { Images } from 'src/images/images.entity';
import { Reviews } from 'src/reviews/review.entity';
import { Routes } from 'src/tours/routes/route.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Destinations } from './destinations/destination.entity';
import { TourServices } from './tour-services/tour-service.entity';
import { TourType } from './tour-type/tour-type.entity';

@Entity()
export class Tours extends CommonEntity {
  @Column()
  title: string;

  @ManyToOne(() => Destinations, (destination) => destination.id)
  destination: Destinations;

  @Column()
  price: number;

  @Column()
  discountedPrice: number;

  @Column()
  dayLength: number;

  @Column()
  nightLength: number;


  @ManyToOne(() => TourType, (tourType) => tourType.id)
  tourType: TourType;

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

  @Column('text')
  tourDetails: string;

  @Column()
  thumbnail: string;

  @Column()
  thingToSee: string;

  @Column()
  thingToDo: string;

  @OneToMany(() => Images, (image) => image.tour)
  images: Images[];

  @OneToMany(() => TourServices, (service) => service.tour)
  includesServices: TourServices[];

  @OneToMany(() => TourServices, (service) => service.tour)
  excludeServices: TourServices[];

  @OneToMany(() => Reviews, (review) => review.tour)
  reviews: Reviews[];

  @OneToMany(() => Routes, (routes) => routes.tour)
  routes: Routes[];
}