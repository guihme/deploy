import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ORMScheduling, ORMService, ORMUser } from './entity';
import { SchedulingRepository } from './SchedulingRepository';
import { ServiceRepository } from './ServiceRepository';
import { UserRepository } from './UserRepository';


@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ORMUser, ORMScheduling, ORMService])],
  providers: [UserRepository, SchedulingRepository, ServiceRepository],  
  exports: [UserRepository, SchedulingRepository, ServiceRepository],
})
export class RepositoryModule {}
