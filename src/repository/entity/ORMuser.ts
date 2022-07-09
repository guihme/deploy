import { UserDTO } from 'src/DTO';
import { User } from 'src/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class ORMUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 64, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  password!: string;

  @Column({ type: 'timestamp', nullable: false })
  birth!: Date;

  @Column({ type: 'varchar', length: 64, nullable: true })
  gender?: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  phone!: string;

  @Column({ type: 'boolean', nullable: true })
  admin?: boolean;

  static import(instance: User): ORMUser {
    const entity = new ORMUser();

    entity.name = instance.name;
    entity.email = instance.email;
    entity.password = instance.password;
    entity.birth = instance.birth;
    entity.gender = instance.gender;

    entity.phone = instance.phone;
    entity.admin = instance.admin;

    return entity;
  }

  export(): User {
    const retrivedData: UserDTO = {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      birth: this.birth.toISOString(),
      gender: this.gender,
      phone: this.phone,
      admin: this.admin,
    };

    const buildUser = User.build(retrivedData);
    if(buildUser.isFailure) {
      throw buildUser.error;
    }
    return buildUser.getValue();
  }
}
