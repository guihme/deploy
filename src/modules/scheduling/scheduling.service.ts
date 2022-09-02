import { Injectable } from '@nestjs/common';
import { CreateSchedulingProps, Scheduling } from '../../entity';
import { Result } from 'src/shared/result';
import { SchedulingRepository } from '../../repository';
import { SchedulingDTO } from 'src/DTO';

@Injectable()
export class SchedulingService {
    constructor(protected readonly schedulingRepository: SchedulingRepository) { }
  
    public async createAndSave(data: CreateSchedulingProps): Promise<Result<Scheduling>> {
      const created = Scheduling.create(data);
      if (created.isFailure) {
        return created;
      }
  
      const saved = await this.schedulingRepository.save(created.getValue());
  
      if(saved.isFailure) {
        return Result.fail(new Error("schedule already exists."))
      }
  
      return created;
    }
  
    public async getAll(): Promise<Result<Scheduling[]>> {
      return await this.schedulingRepository.all();
    }
  
    async findOne(id: string): Promise<Result<Scheduling>> {
      
      return await this.schedulingRepository.findById(id);
    }

    async update(data: CreateSchedulingProps, id: string): Promise<Result<Scheduling>> {
      let schedule = await this.findOne(id);

      if(schedule.isFailure) {        
        return Result.fail(schedule.error);
      }

      const schedulingDTO: SchedulingDTO = {
        id: id,
        ...data
      }

      let build = Scheduling.build(schedulingDTO);

      if(build.isFailure) {
        return Result.fail(build.error);
      }
      
      const saved = await this.schedulingRepository.save(build.getValue());

      if(saved.isFailure) {
        return Result.fail(new Error("schedule already exists."));
      }
      
      return build;

    }

    async delete(id: string): Promise<Result<void>> {
      return this.schedulingRepository.delete(id);
    }

}
