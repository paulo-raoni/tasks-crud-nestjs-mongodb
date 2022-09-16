import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Post()
  async createOneUser(
    @Body('name') name: string,
    @Body('password') password: string,
  ) {
    const generatedId = await this.usersService.create(name, password);
    return { id: generatedId };
  }
}
