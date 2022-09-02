import { Injectable } from '@nestjs/common';
import { CreateCustomerProps, Customer } from '../../entity';
import { Result } from 'src/shared/result';
import { CustomerRepository } from '../../repository';
import { CustomerDTO } from 'src/DTO';

@Injectable()
export class CustomerService {
    constructor(protected readonly customerRepository: CustomerRepository) { }
  
    public async createAndSave(data: CreateCustomerProps): Promise<Result<Customer>> {
      const created = Customer.create(data);
      if (created.isFailure) {
        return created;
      }
  
      const saved = await this.customerRepository.save(created.getValue());
  
      if(saved.isFailure) {
        return Result.fail(new Error("customer already exists."))
      }
  
      return created;
    }
  
    public async getAll(): Promise<Result<Customer[]>> {
      return await this.customerRepository.all();
    }

    async findOne(id: string): Promise<Result<Customer>> {
  
      return await this.customerRepository.findById(id);
    }

    async update(data: CreateCustomerProps, id: string): Promise<Result<Customer>> {
      let customer = await this.findOne(id);

      if(customer.isFailure) {
        return Result.fail(customer.error);
      }

      const customerDTO: CustomerDTO = {
        id: id,
        ...data
      }

      let build = Customer.build(customerDTO);

      if(build.isFailure) {
        return Result.fail(build.error);
      }

      const saved = await this.customerRepository.save(build.getValue());
  
      if(saved.isFailure) {
        return Result.fail(new Error("phone already exists."));
      }
  
      return build;

    }

    async delete(id: string): Promise<Result<void>> {
      return this.customerRepository.delete(id);
    }
  }