import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class CallBack extends CommonEntity {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  contact: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  whatsapp: string;

  @Column({ nullable: true })
  telegram: string;

  @Column({ nullable: true })
  voice: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  timezone: string;

  @Column('text', { nullable: true })
  note: string;
}
