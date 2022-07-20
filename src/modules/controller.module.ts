import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user';
import { ServiceModule } from './service';
import { SchedulingModule } from './scheduling';
import { CustomerModule } from './customer';

@Module({
  imports: [UserModule, ServiceModule, SchedulingModule, CustomerModule, AuthController],
  providers: [],
})
export class controllerModule {}
