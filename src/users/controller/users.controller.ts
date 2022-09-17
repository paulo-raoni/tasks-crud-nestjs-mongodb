import { Controller, Post, Body, Get, Param, Query, Delete } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get(':name')
  getUserByName(@Query('name') name: string) {
    return this.usersService.findByName(name);
  }

  // @Post()
  // async createOneUser(
  //   @Body('name') name: string,
  //   @Body('password') password: string,
  // ) {
  //   const createdUser = await this.authenticationService.register(name, password);
  //   return createdUser;
  // }

  @Delete()
  async deleteUserById(
    @Body('userId') userId: string
  ) {
    const createdUser = await this.usersService.deleteUserById(userId);
    return createdUser;
  }
}
