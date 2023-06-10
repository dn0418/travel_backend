import { CommonEntity } from "src/common/common.entity";
import { Column, Entity } from "typeorm";


@Entity()
export class CarDriver extends CommonEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  location: string;

  @Column()
  profile_photo: string;

  @Column()
  licenseNo: string;

  @Column()
  locenseExpireDate: string;
}
