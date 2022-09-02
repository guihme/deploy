import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class createSchedulingProps {
  @ApiProperty({
    example: '501695c6-78bd-4610-a86c-9511ac61d8dc',
  })
  user_id: string;

  @ApiProperty({
    example: '688b7d04-52dc-4048-8b5a-067309f4ecb0',
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
