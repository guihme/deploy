import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class createServiceProps {
  @ApiProperty({
    example: 'Corte',
  })
  name: string;

  @ApiProperty({
    example: '501695c6-78bd-4610-a86c-9511ac61d8dc',
  })
  customer_id: string;

  @ApiProperty({
    example: '20,00',
  })
  price: string;

  @ApiProperty({
    example: 'Corte de cabelo',
  })
  description: string;

  @ApiProperty({
    example: 'https://image.com.br/2587.jpeg',
  })
  image: string;
}

export const BodyCreateOptions: ApiBodyOptions = {
  type: createServiceProps,
};

export class ServiceSchema { }