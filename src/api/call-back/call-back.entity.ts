import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class CallBack extends CommonEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @Column()
  phone: string;

  @Column()
  whatsapp: string;

  @Column()
  telegram: string;

  @Column()
  voice: string;

  @Column()
  country: string;

  @Column()
  timezone: string;

  @Column('text')
  note: string;
}
