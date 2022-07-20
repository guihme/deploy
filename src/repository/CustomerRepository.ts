import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from "src/entity";
import { Result } from "src/shared/result";
import { QueryFailedError, Repository } from "typeorm";
import { ORMCustomer } from "./entity";

@Injectable()
export class CustomerRepository {
    constructor(
        @InjectRepository(ORMCustomer)
        private readonly repository:Repository<ORMCustomer>,
    ){}

    async save(data: Customer): Promise<Result<void>> {
        try {
            await this.repository.save(ORMCustomer.import(data));

            return Result.ok();
        } catch (e) {
            if (e instanceof QueryFailedError) {
                return Result.fail(e);
            }
            throw e;
        }
    }

    async all(): Promise<Result<Customer[]>> {
        const customersORM = await this.repository.find();

        const customersEntity: Customer[] = [];
        for (const customerORM of customersORM) {
            const customerEntity = customerORM.export();
            customersEntity.push(customerEntity);
        }
        return Result.ok(customersEntity)
    }

    async findByID(id: string): Promise<Result<Customer>> {
        const customerORM = await this.repository.findOne({ id: id });
        if (!customerORM) {
          return Result.fail(new Error("Not found!"));
        }
        return Result.ok(customerORM.export());
      }
}