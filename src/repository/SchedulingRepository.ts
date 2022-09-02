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

  async findById(id: string): Promise<Result<Scheduling>> {
    const schedulingORM = await this.repository.findOne({ id: id });
    if (!schedulingORM) {
      return Result.fail(new Error("Not found!"));
    }
    return Result.ok(schedulingORM.export());
  }

  async delete(id: string): Promise<Result<void>> {
    try {
      const schedule = await this.repository.findOne({id: id});
      if (!schedule) return Result.fail(new Error());
      await this.repository.delete(schedule);
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error());
      }
      throw e;
    }
  }
}
