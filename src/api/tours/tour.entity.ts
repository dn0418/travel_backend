import { Images } from 'src/api/images/images.entity';
import { Reviews } from 'src/api/reviews/review.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DeparturesPricing } from './departures-pricing/departures-pricing.entity';
import { Destinations } from './destinations/destination.entity';
import { IndividualPricing } from './individual-pricing/individual-pricing.entity';
import { Routes } from './routes/route.entity';
import { TourServices } from './tour-services/tour-service.entity';

@Entity()
export class Tours extends CommonEntity {
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
  price: number;

  @Column()
  dayLength: number;

  @Column()
  nightLength: number;

  @Column()
  bestTime: string;

  @Column()
  bestTime_ru: string;

  @Column()
  bestTime_hy: string;

  @Column()
  isFixedDate: boolean;

  @Column({ nullable: true })
  startDate: string;

  @Column({ nullable: true })
  endDate: string;

  @Column()
  mainList: string;

  @Column()
  childList: string;

  @Column('text')
  shortDescription: string;

  @Column('text')
  shortDescription_ru: string;

  @Column('text')
  shortDescription_hy: string;

  @Column('text')
  longDescription: string;

  @Column('text')
  longDescription_ru: string;

  @Column('text')
  longDescription_hy: string;

  @Column({ default: true })
  freeCancelation: boolean;

  @Column()
  activities: number;

  @ManyToOne(() => Destinations, (destination) => destination.id)
  destination: Destinations;

  @Column()
  thumbnail: string;

  @Column()
  locationImg: string;

  @OneToMany(() => TourServices, (service) => service.tour)
  includesServices: TourServices[];

  @OneToMany(() => TourServices, (service) => service.tour)
  excludeServices: TourServices[];

  @OneToMany(() => Images, (image) => image.tour)
  images: Images[];

  @OneToMany(() => Reviews, (review) => review.tour)
  reviews: Reviews[];

  @OneToMany(() => Routes, (routes) => routes.tour)
  routes: Routes[];

  @OneToMany(() => IndividualPricing, (individualPricing) => individualPricing.tour)
  individualPricing: IndividualPricing[];

  @OneToMany(() => DeparturesPricing, (departuresPricing) => departuresPricing.tour)
  departuresPricing: DeparturesPricing[];
};