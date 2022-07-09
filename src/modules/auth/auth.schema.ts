import { ApiBodyOptions, ApiProperty } from '@nestjs/swagger';

class AuthUserProps {

  @ApiProperty({
    example: 'teste@gmail.com',
  })
  email: string;

  @ApiProperty({
    example: 'KJK55hf854dds',
  })
  password: string;

}

export const AuthBodyOptions: ApiBodyOptions = {
  type: AuthUserProps,
};

export class AuthUserSchema {}