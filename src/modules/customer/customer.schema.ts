import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class createCustomerProps {
    @ApiProperty({
        example: 'Name',
    })
    name: string;

    @ApiProperty({
        example: '99 999999999',
    })
    phone: string;

}

export const BodyCreateOptions: ApiBodyOptions = {
  type: createCustomerProps,
};

export class CustomerSchema {}

