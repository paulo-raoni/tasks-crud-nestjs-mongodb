import { Controller, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../../authentication/jwt-authentication.guard';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getAllUsers() {
    return this.usersService.findAll();
  }
 
  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Delete()
  @UseGuards(JwtAuthenticationGuard)
  async deleteUserById(
    @Body('userId') userId: string
  ) {
    const createdUser = await this.usersService.deleteUserById(userId);
    return createdUser;
  }
}
