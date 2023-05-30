import { DataSource } from 'typeorm';
import { ParentTour } from './parenttour.entity';

export const parentTourProviders = [
  {
    provide: 'PARENTTOUR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ParentTour),
    inject: ['DATA_SOURCE'],
  },
];