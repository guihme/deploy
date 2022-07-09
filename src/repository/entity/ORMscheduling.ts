import { SchedulingDTO } from 'src/DTO';
import { Scheduling } from 'src/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scheduling')
export class ORMScheduling {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  user_id!: string;

  @Column({ type: 'varchar', length: 64, nullable: false })
  service_id!: string;

  @Column({ type: 'timestamp', nullable: false })
  date!: Date;

  @Column({ type: 'boolean', nullable: false })
  is_canceled?: boolean;


  static import(instance: Scheduling): ORMScheduling {
    const entity = new ORMScheduling();

    entity.user_id = instance.user_id;
    entity.service_id = instance.service_id;
    entity.date = instance.date;
    entity.is_canceled = instance.is_canceled;
    
    return entity;
  }

  export(): Scheduling {
    const retrivedData: SchedulingDTO = {
      id: this.id,
      user_id: this.user_id,
      service_id: this.service_id,
      date: this.date.toISOString(),
      is_canceled: this.is_canceled,
    };

    const buildScheduling = Scheduling.build(retrivedData);
    if(buildScheduling.isFailure) {
      throw buildScheduling.error;
    }
    return buildScheduling.getValue();
  }
}
