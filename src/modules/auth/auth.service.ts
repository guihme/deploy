import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(protected userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const userFind = await this.userService.findByEmail(email);
    if(userFind.isFailure) {
      return null;
    }
    const user = userFind.getValue();

    if (user && pass === user.password) {
      const { password, ...result } = user.toDTO();
      
      return result;
    }
    return null;
  }
}
