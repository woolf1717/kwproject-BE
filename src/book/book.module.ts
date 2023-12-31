import { Module, NestModule } from '@nestjs/common';

import { Book } from 'src/typeorm/entities/Books';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule implements NestModule {
  configure() {}
}
