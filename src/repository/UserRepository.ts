import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity';
import { QueryFailedError, Repository } from 'typeorm';
import { ORMUser } from './entity';
import { Result } from 'src/shared/result';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(ORMUser)
    private readonly repository: Repository<ORMUser>,
  ) {}

  async save(data: User): Promise<Result<void>> {
    try {
      await this.repository.save(ORMUser.import(data));
      
      return Result.ok();
    } catch (e) {
      if (e instanceof QueryFailedError) {

        return Result.fail(e);
      }
      throw e;
    }
  }

  async all(): Promise<Result<User[]>> {
    const usersORM = await this.repository.find();

    const usersEntity: User[] = [];
    for (const userORM of usersORM) {
      const userEntity = userORM.export();
      usersEntity.push(userEntity);
    }
    return Result.ok(usersEntity);
  }

  async findByEmail(email: string): Promise<Result<User>> {
    const userORM = await this.repository.findOne({ email: email });
    if (!userORM) {
      return Result.fail(new Error("Not found!"));
    }
    return Result.ok(userORM.export());
  }

  async findById(id: string): Promise<Result<User>> {
    const userORM = await this.repository.findOne({ id: id });
    if (!userORM) {
      return Result.fail(new Error("Not found!"));
    }
    return Result.ok(userORM.export());
  }

  async delete(id: string): Promise<Result<void>> {
    try {
      const user = await this.repository.findOne({id: id});
      if (!user) return Result.fail(new Error());
      await this.repository.delete(user);
      return Result.ok<void>();
    } catch (e) {
      if (e instanceof QueryFailedError) {
        return Result.fail(new Error());
      }
      throw e;
    }
  }
}
