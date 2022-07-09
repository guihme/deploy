import * as Joi from 'joi';
import { Result } from 'src/shared/result';
import { v4 as uuidv4 } from 'uuid';
import { UserDTO } from '../DTO';

export interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  birth: string;
  gender: string | undefined;
  phone: string;
  admin: boolean | undefined;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  birth: Date;
  gender: string | undefined;
  phone: string;
  admin: boolean | undefined;
}
export class User {
  constructor(protected props: UserProps) {
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get birth(): Date {
    return this.props.birth;
  }

  get gender(): string | undefined {
    return this.props.gender;
  }

  get phone(): string {
    return this.props.phone;
  }

  get admin(): boolean | undefined {
    return this.props.admin;
  }

  static validate(data: UserProps): Result<UserProps> {

    const userObject = {
      id: Joi.string().guid({ version: "uuidv4" }),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      birth: Joi.object().instance(Date).required(),
      gender: Joi.string().optional(),
      phone: Joi.string().required(),
      admin: Joi.boolean().optional(),
    };

    const { value, error } = Joi.object(userObject).unknown().validate(data);

    if (error) {
       return Result.fail(error);
    }

    return Result.ok(value);
  }

  static create(data: CreateUserProps): Result<User> {
    const validated = this.validate({
      ...data,
      id: uuidv4(),
      birth: new Date(data.birth),
    });
      
    if (validated.isFailure) {
      
      return Result.fail(validated.error);
    }
    return Result.ok(new User(validated.getValue()));
  }

  static build(data: UserDTO): Result<User> {
    const validated = this.validate({
      ...data,
      birth: new Date(data.birth),
    });

    if (validated.isFailure) {
      return Result.fail(validated.error);
    }
    return Result.ok(new User(validated.getValue()));
  }

  toDTO(): UserDTO {
    return {
      ...this.props,
      birth: this.props.birth.toISOString(),
    };
  }
}
