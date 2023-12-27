import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookType } from 'src/utils/types';
import { Book } from 'src/typeorm/entities/Books';
import { bookScraper } from '../utils/bookScraper';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookType) {
    // console.log(createBookDto);

    const currentBookState = await bookScraper(
      createBookDto['departmentCode'],
      createBookDto['bookNumber'],
      createBookDto['controlNumber'],
    );

    return this.bookRepository.save(currentBookState);
  }

  async findAll() {
    const books = (await this.bookRepository.find()).map((book) => {
      {
        return {
          id: book.id,
          departmentCode: book.departmentCode,
          bookNumber: book.bookNumber,
          controlNumber: book.controlNumber,
        };
      }
    });

    return books;
  }

  async findOne(id: number) {
    const books = await this.bookRepository.find();

    const foundBook = books.find((book) => book.id === id);

    return foundBook;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    console.log(updateBookDto);
    return `This action updates a #${id} book`;
  }

  async remove(id: number) {
    const books = await this.bookRepository.find();

    const foundBook = books.find((book) => book.id === id);
    const book = await this.bookRepository.remove(foundBook);

    return book;
  }
}
