import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './CustomerRepository';
import { ORMCustomer, ORMScheduling, ORMService, ORMUser } from './entity';
import { SchedulingRepository } from './SchedulingRepository';
import { ServiceRepository } from './ServiceRepository';
import { UserRepository } from './UserRepository';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ORMUser, ORMScheduling, ORMService, ORMCustomer])],
  providers: [UserRepository, SchedulingRepository, ServiceRepository, CustomerRepository],
  exports: [UserRepository, SchedulingRepository, ServiceRepository, CustomerRepository],
})
export class RepositoryModule { }
