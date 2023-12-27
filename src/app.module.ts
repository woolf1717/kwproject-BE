import { Book } from './typeorm/entities/Books';
import { BookModule } from './book/book.module';
import { Module } from '@nestjs/common';
import { Profile } from './typeorm/entities/Profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'haslo123',
      database: 'mydb',
      entities: [User, Profile, Book],
      synchronize: true,
    }),
    UsersModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
