import { Injectable } from '@nestjs/common';
import { CreateSchedulingProps, Scheduling } from '../../entity';
import { Result } from 'src/shared/result';
import { SchedulingRepository } from '../../repository';

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
  
    /*
    async findByService(service_id: string): Promise<Result<Scheduling[]>> {
  
      return await this.schedulingRepository.findByService(service_id);
    }

    
    async findByDate(date: string): Promise<Result<Scheduling[]>> {
  
        return await this.schedulingRepository.findByDate(date);
    }
    */

}
