import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import JwtAuthenticationGuard from '../../authentication/jwt-authentication.guard';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  async getAllTasks() {
    return await this.tasksService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createOneTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
    @Body('userId') userId: ObjectId,
  ) {
    const generatedId = await this.tasksService.create(
      title,
      description,
      status,
      userId,
    );
    return { id: generatedId };
  }

  @Get(':taskId')
  @UseGuards(JwtAuthenticationGuard)
  async getOneTask(@Param('taskId') taskId: string) {
    const response = await this.tasksService.getOneTask(taskId);
    return {
      response,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  async updateTask(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
  ) {
    return this.tasksService.updateTask(id, title, description, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async deleteTask(@Param('id') taskId: string) {
    await this.tasksService.deleteTask(taskId);
    return {
      response: 'sucessfully deleted',
    };
  }

  @Delete()
  @UseGuards(JwtAuthenticationGuard)
  async deleteAllTasks() {
    await this.tasksService.deleteAllTasks();
    return {
      response: 'sucessfully deleted',
    };
  }
}
