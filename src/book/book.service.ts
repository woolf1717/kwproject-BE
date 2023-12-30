import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookType } from 'src/utils/types';
import { Book } from 'src/typeorm/entities/Books';
import { bookScraper } from '../utils/bookScraper';
import { compareBooks } from 'src/utils/compareBooks';
import { SetMonitoredDto } from './dto/set-monitored.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookType) {
    const currentBookState = await bookScraper(
      createBookDto['departmentCode'],
      createBookDto['bookNumber'],
      createBookDto['controlNumber'],
    );

    return this.bookRepository.save(currentBookState);
  }

  async setMonitored(data: SetMonitoredDto) {
    const books = await this.bookRepository.find();
    console.log(data, data.id);
    const foundBook = books.find((book) => {
      return book.id === data.id;
    });

    console.log(foundBook.isMonitored);

    const updatedBook = await this.bookRepository.update(data.id, {
      isMonitored: !foundBook.isMonitored,
    });

    return updatedBook;
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

  async compare(id1: number, id2: number) {
    const books = await this.bookRepository.find();

    const book1 = books.find((book) => book.id === id1);
    const book2 = books.find((book) => book.id === id2);

    return compareBooks(book1, book2);
  }
}
