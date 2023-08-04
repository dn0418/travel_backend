import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Currency extends CommonEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column('float')
  rate: number;
}
