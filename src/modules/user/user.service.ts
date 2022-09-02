import { Injectable } from '@nestjs/common';
import { CreateUserProps, User } from '../../entity';
import { Result } from 'src/shared/result';
import { UserRepository } from '../../repository';
import { UserDTO } from 'src/DTO';

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

    async findOne(id: string): Promise<Result<User>> {
  
      return await this.userRepository.findById(id);
    }

    async update(data: CreateUserProps, id: string): Promise<Result<User>> {
      let user = await this.findOne(id);

      if(user.isFailure) {        
        return Result.fail(user.error);
      }

      const userDTO: UserDTO = {
        id: id,
        ...data
      }

      let build = User.build(userDTO);

      if(build.isFailure) {
        return Result.fail(build.error);
      }
      
      const saved = await this.userRepository.save(build.getValue());
  
      if(saved.isFailure) {
        return Result.fail(new Error("email already exists."));
      }
      
      return build;

    }

    async delete(id: string): Promise<Result<void>> {
      return this.userRepository.delete(id);
    }
  }