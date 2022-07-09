import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class createUserProps {
  @ApiProperty({
    example: 'Name',
  })
  name: string;

  @ApiProperty({
    example: 'teste@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'KJK55hf854dds',
  })
  password: string;

  @ApiProperty({
    example: '03/05/2001',
  })
  birth: Date;

  @ApiProperty({
    example: 'male',
    required: false,
  })
  gender: string;

  @ApiProperty({
    example: '99999999999',
  })
  phone: string;

  @ApiProperty({
    example: true,
    required: false,
  })
  admin: boolean;
}

export const BodyCreateOptions: ApiBodyOptions = {
  type: createUserProps,
};

export class UserSchema {}
