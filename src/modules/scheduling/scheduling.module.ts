import { Module } from '@nestjs/common';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';

@Module({
    providers: [SchedulingService],
    controllers: [SchedulingController],
    exports: [SchedulingService]
})
export class SchedulingModule { }

