import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    MongooseModule.forRoot(
      `mongodb+srv://root:toor@cluster0.bpcmmnq.mongodb.net/test`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
