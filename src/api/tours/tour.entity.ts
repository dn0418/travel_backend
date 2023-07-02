import { Images } from 'src/api/images/images.entity';
import { Reviews } from 'src/api/reviews/review.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Destinations } from './destinations/destination.entity';
import { Routes } from './routes/route.entity';
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
  dayLength: number;

  @Column()
  nightLength: number;

  @ManyToOne(() => TourType, (tourType) => tourType.id)
  tourType: TourType;

  @Column()
  bestTime: string;

  @Column()
  activities: number;

  @Column('text')
  tourDetails: string;

  @Column()
  thumbnail: string;

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