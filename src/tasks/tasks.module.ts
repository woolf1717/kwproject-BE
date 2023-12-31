import { BookModule } from 'src/book/book.module';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { EmailModule } from 'src/email/email.module';

@Module({ imports: [BookModule, EmailModule], providers: [TasksService] })
export class TasksModule {}
