import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tours {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
