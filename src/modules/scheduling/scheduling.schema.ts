import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class createSchedulingProps {
  @ApiProperty({
    example: 'IF4562DA',
  })
  user_id: string;

  @ApiProperty({
    example: '45EGHN12',
  })
  service_id: string;

  @ApiProperty({
    example: '03/05/2001 13:20:22',
  })
  date: Date;

  @ApiProperty({
    example: false,
  })
  is_canceled: boolean;
}

export const BodyCreateOptions: ApiBodyOptions = {
  type: createSchedulingProps,
};

export class SchedulingSchema {}
