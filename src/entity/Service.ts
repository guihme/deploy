import * as Joi from 'joi';
import { ServiceDTO } from 'src/DTO';
import { Result } from 'src/shared/result';
import { v4 as uuidv4 } from 'uuid';

export interface CreateServiceProps {
  customer_id: string;
  name: string;
  price: string;
  description: string;
}

interface ServiceProps extends CreateServiceProps{
  id: string;
}

export class Service{
  constructor(protected props: ServiceProps){
    this.props = props;
  }

  get customer_id(): string{
    return this.props.customer_id;
  }

  get name(): string{
    return this.props.name;
  }

  get price(): string{
    return this.props.price;
  }

  get description(): string{
    return this.props.description;
  }

  static validate(data: ServiceProps): Result<ServiceProps> {

    const serviceObject = {
      id: Joi.string().guid({ version: "uuidv4" }),
      customer_id: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.string().required(),
     description: Joi.string().required(),  
    };

    const { value, error } = Joi.object(serviceObject).unknown().validate(data);

    if (error) {
       return Result.fail(error);
    }

    return Result.ok(value);
  }

  static create(data: CreateServiceProps): Result<Service> {
    const validated = this.validate({
      ...data,
      id: uuidv4(),
    });
      
    if (validated.isFailure) {
      
      return Result.fail(validated.error);
    }
    return Result.ok(new Service(validated.getValue()));
  }

  static build(data: ServiceDTO): Result<Service> {
    const validated = this.validate({
      ...data,
    });

    if (validated.isFailure) {
      return Result.fail(validated.error);
    }
    return Result.ok(new Service(validated.getValue()));
  }

  toDTO(): ServiceDTO {
    return {
      ...this.props,
    };
  }
}