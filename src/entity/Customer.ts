import * as Joi from 'joi';
import { CustomerDTO } from 'src/DTO/CustomerDTO';
import { Result } from 'src/shared/result';
import { v4 as uuidv4 } from 'uuid';
import { Service } from './Service';

export interface CreateCustomerProps {
    name: string;
    phone: string;
}

export interface CustomerProps {
    id: string;
    name: string;
    phone: string;
    
}

export class Customer {

    protected readonly _id: string;

    constructor(protected props: CustomerProps) {
        this.props = props;
        this._id = props.id;
    }
    
    get id(): string{
        return this._id;
    }
      
    get name(): string{
        return this.props.name;
    }

    get phone(): string{
        return this.props.phone;
    }


    static validate(data: CustomerProps): Result<CustomerProps> {

        const customerObject = {
          id: Joi.string().guid({ version: "uuidv4" }),
          name: Joi.string().required(),
          phone: Joi.string().required(), 
        };

        const { value, error } = Joi.object(customerObject).unknown().validate(data);

        if (error) {
            return Result.fail(error);
        }
         return Result.ok(value);
    }

    static create(data: CreateCustomerProps): Result<Customer> {
        const validated = this.validate({
            ...data,
            id: uuidv4(),
        });
            
          if (validated.isFailure) {
            return Result.fail(validated.error);
        }
        return Result.ok(new Customer(validated.getValue()));
    }

    static build(data: CustomerDTO): Result<Customer> {
        const validated = this.validate({
          ...data,
        });
    
        if (validated.isFailure) {
          return Result.fail(validated.error);
        }
        return Result.ok(new Customer(validated.getValue()));
      }

      toDTO(): CustomerDTO {
        return {
          ...this.props,
        };
    }
}
