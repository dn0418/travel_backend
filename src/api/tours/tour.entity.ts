import { Images } from 'src/api/images/images.entity';
import { Reviews } from 'src/api/reviews/review.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DeparturesPricing } from './departures-pricing/departures-pricing.entity';
import { Destinations } from './destinations/destination.entity';
import { IndividualPricing } from './individual-pricing/individual-pricing.entity';
import { Routes } from './routes/route.entity';
import { TourServices } from './tour-services/tour-service.entity';
import { TourType } from './tour-type/tour-type.entity';

@Entity()
export class Tours extends CommonEntity {
  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  dayLength: number;

  @Column()
  nightLength: number;

  @Column()
  bestTime: string;

  @ManyToOne(() => TourType, (tourType) => tourType.id)
  tourType: TourType;

  @Column('text')
  shortDescription: string;

  @Column('text')
  longDescription: string;

  @Column()
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
}