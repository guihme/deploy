import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { UserModule } from './user';
import { ServiceModule } from './service';
import { SchedulingModule } from './scheduling';

@Module({
  imports: [UserModule, ServiceModule, SchedulingModule, AuthController],
  providers: [],
})
export class controllerModule {}
