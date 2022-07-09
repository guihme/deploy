import { Injectable } from '@nestjs/common';
import { CreateUserProps, User } from '../../entity';
import { Result } from 'src/shared/result';
import { UserRepository } from '../../repository';

@Injectable()
export class UserService {
    constructor(protected readonly userRepository: UserRepository) { }
  
    public async createAndSave(data: CreateUserProps): Promise<Result<User>> {
      const created = User.create(data);
      if (created.isFailure) {
        return created;
      }
  
      const saved = await this.userRepository.save(created.getValue());
  
      if(saved.isFailure) {
        return Result.fail(new Error("email already exists."))
      }
  
      return created;
    }
  
    public async getAll(): Promise<Result<User[]>> {
      return await this.userRepository.all();
    }
  
    async findByEmail(email: string): Promise<Result<User>> {
  
      return await this.userRepository.findByEmail(email);
    }
  }