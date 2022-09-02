import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ORMService } from './entity';
import { Result } from 'src/shared/result';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(ORMService)
    private readonly repository: Repository<ORMService>,
  ) { }

  async save(data: Service): Promise<Result<void>> {
    try {
      await this.repository.save(ORMService.import(data));

      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {

        return Result.fail(e);
      }
      throw e;
    }
  }

  async all(): Promise<Result<Service[]>> {
    const servicesORM = await this.repository.find();

    const servicesEntity: Service[] = [];
    for (const serviceORM of servicesORM) {
      const serviceEntity = serviceORM.export();
      servicesEntity.push(serviceEntity);
    }
    return Result.ok(servicesEntity);
  }

  async findById(id: string): Promise<Result<Service>> {
    const serviceORM = await this.repository.findOne({ id: id });
    if (!serviceORM) {
      return Result.fail(new Error("Not found!"));
    }
    return Result.ok(serviceORM.export());
  }

  async delete(id: string): Promise<Result<void>> {
    try {
      const service = await this.repository.findOne({id: id});
      if (!service) return Result.fail(new Error());
      await this.repository.delete(service);
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error());
      }
      throw e;
    }
  }

}
