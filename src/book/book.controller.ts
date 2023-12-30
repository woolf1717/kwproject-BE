import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SetMonitoredDto } from './dto/set-monitored.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Post('monitored')
  setMonitored(@Body() data: SetMonitoredDto) {
    return this.bookService.setMonitored(data);
  }

  @Get()
  findAll() {
    //only return the id, departmentCode, bookNumber, and controlNumber
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    //return the entire book
    return this.bookService.findOne(+id);
  }

  @Get('compare/:id1/:id2')
  compare(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.bookService.compare(+id1, +id2);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
