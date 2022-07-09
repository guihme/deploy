import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scheduling } from '../entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ORMScheduling } from './entity';
import { Result } from 'src/shared/result';

@Injectable()
export class SchedulingRepository {
  constructor(
    @InjectRepository(ORMScheduling)
    private readonly repository: Repository<ORMScheduling>,
  ) {}

  async save(data: Scheduling): Promise<Result<void>> {
    try {
      await this.repository.save(ORMScheduling.import(data));

      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {

        return Result.fail(e);
      }
      throw e;
    }
  }

  async all(): Promise<Result<Scheduling[]>> {
    const schedulesORM = await this.repository.find();

    const schedulesEntity: Scheduling[] = [];
    for (const scheduleORM of schedulesORM) {
      const scheduleEntity = scheduleORM.export();
      schedulesEntity.push(scheduleEntity);
    }
    return Result.ok(schedulesEntity);
  }

  /*
  async findByService(service_id: string): Promise<Result<Scheduling[]>> {
    
  }

  async findByDate(date: string): Promnise<Result<Scheduling[]>> {

  }
  */
}
