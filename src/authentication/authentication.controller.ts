import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    return this.authenticationService.register(name, password);
  }

  // @UseGuards(LocalAuthenticationGuard)
  @HttpCode(200)  
  @Post('login')
  async logIn(@Req() request: any, @Res({ passthrough: true }) response: Response) {
    const { body } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(body._id);
    response.setHeader('Set-Cookie', cookie);
    body.password = undefined;
    return response.send(body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logOut(@Req() request: any, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: any) {
    const {body} = request;
    body.password = undefined;
    return body;
  }
}
