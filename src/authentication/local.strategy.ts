import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { User } from '../users/model/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'name',
    });
  }
  async validate(name: string, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(name, password);
  }
}
