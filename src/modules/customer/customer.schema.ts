import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class createCustomerProps {
    @ApiProperty({
        example: 'ARR2021OZ',
    })
    id: string;
    @ApiProperty({
        example: 'Name',
    })
    name: string;

    @ApiProperty({
        example: '99 999999999',
    })
    phone: string;

    @ApiProperty({
        example: 'FEI2022JAO'
    })
    service_id: string;
}

export const BodyCreateOptions: ApiBodyOptions = {
  type: createCustomerProps,
};

export class CustomerSchema {}

