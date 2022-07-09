import * as Joi from 'joi';
import { Result } from 'src/shared/result';
import { v4 as uuidv4 } from 'uuid';
import { SchedulingDTO } from '../DTO';

export interface CreateSchedulingProps {
  user_id: string;
  service_id: string;
  date: string;
  is_canceled: boolean | undefined;
}

export interface SchedulingProps {
  id: string;
  user_id: string;
  service_id: string;
  date: Date;
  is_canceled: boolean | undefined;
}

export class Scheduling {
  constructor(protected props: SchedulingProps) {
  this.props = props;
}

  get user_id(): string{
    return this.props.user_id;
  }

  get service_id(): string{
    return this.props.service_id;
  }

  get date(): Date{
    return this.props.date;
  }

  get is_canceled(): boolean | undefined{
    return this.props.is_canceled;
  }

  static validate(data: SchedulingProps): Result<SchedulingProps> {

    const schedulingObject = {
      id: Joi.string().guid({ version: "uuidv4" }),
      user_id: Joi.string().required(),
      service_id: Joi.string().required(),
      date: Joi.object().instance(Date).required(),
      is_canceled: Joi.boolean().optional(),  
    };

    const { value, error } = Joi.object(schedulingObject).unknown().validate(data);

    if (error) {
       return Result.fail(error);
    }

    return Result.ok(value);
  }


  static create(data: CreateSchedulingProps): Result<Scheduling> {
    const validated = this.validate({
      ...data,
      id: uuidv4(),
      date: new Date(data.date),
    });
      
    if (validated.isFailure) {
      
      return Result.fail(validated.error);
    }
    return Result.ok(new Scheduling(validated.getValue()));
  }

  static build(data: SchedulingDTO): Result<Scheduling> {
    const validated = this.validate({
      ...data,
      date: new Date(data.date),
    });

    if (validated.isFailure) {
      return Result.fail(validated.error);
    }
    return Result.ok(new Scheduling(validated.getValue()));
  }

  toDTO(): SchedulingDTO {
    return {
      ...this.props,
      date: this.props.date.toISOString(),
    };
  }

}

