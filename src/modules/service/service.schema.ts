import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class createServiceProps {
  @ApiProperty({
    example: 'Corte',
  })
  name: string;

  @ApiProperty({
    example: '20,00',
  })
  price: string;

  @ApiProperty({
    example: 'Corte de cabelo',
  })
  description: string;
}

export const BodyCreateOptions: ApiBodyOptions = {
  type: createServiceProps,
};

export class ServiceSchema {}