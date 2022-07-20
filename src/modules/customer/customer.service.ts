import { Injectable } from '@nestjs/common';
import { CreateCustomerProps, Customer } from '../../entity';
import { Result } from 'src/shared/result';
import { CustomerRepository } from '../../repository';

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
  
    async findByID(id: string): Promise<Result<Customer>> {
  
      return await this.customerRepository.findByID(id);
    }
  }