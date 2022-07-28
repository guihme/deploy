import { Injectable } from '@nestjs/common';
import { CreateServiceProps, Service } from '../../entity';
import { Result } from 'src/shared/result';
import { ServiceRepository } from '../../repository';

@Injectable()
export class ServiceService {
  constructor(protected readonly serviceRepository: ServiceRepository) { }

  public async createAndSave(data: CreateServiceProps): Promise<Result<Service>> {
    const created = Service.create(data);
    if (created.isFailure) {
      return created;
    }

    const saved = await this.serviceRepository.save(created.getValue());

    if (saved.isFailure) {
      return Result.fail(new Error("service already exists."))
    }

    return created;
  }

  public async getAll(): Promise<Result<Service[]>> {
    return await this.serviceRepository.all();
  }

  async findByEmail(id: string): Promise<Result<Service>> {

    return await this.serviceRepository.findById(id);
  }

  public async update(id: string, data: CreateServiceProps): Promise<Result<Service>> {
    const build = Service.build({
      id,
      ...data,
    });
    if (build.isFailure) {
      return build;
    }

    const saved = await this.serviceRepository.save(build.getValue());

    if (saved.isFailure) {
      return Result.fail(new Error("something went worng!"))
    }

    return build;
  }
}