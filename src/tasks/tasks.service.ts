import { Injectable, Logger } from '@nestjs/common';

import { BookService } from 'src/book/book.service';
import { Cron } from '@nestjs/schedule';
import { bookScraper } from 'src/utils/bookScraper';
import { compareBooks } from 'src/utils/compareBooks';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class TasksService {
  constructor(
    private bookService: BookService,
    private emailService: EmailService,
  ) {
    this.bookService = bookService;
    this.emailService = emailService;
  }

  private readonly logger = new Logger(TasksService.name);

  @Cron('0 39 22 * * 1-7')
  handleCron() {
    this.bookService.findAllFull().then(
      (books) =>
        books.forEach((book) => {
          if (book.isMonitored) {
            const currentBookState = bookScraper(
              book.departmentCode,
              book.bookNumber,
              book.controlNumber,
            );

            currentBookState.then((currentBookState) => {
              const res = compareBooks(
                { ...currentBookState, sectionZero: '' },
                book,
              );

              if (!res.isDifferent) {
                console.log('This books are same.');
              } else {
                console.log('This books are different.');
                this.bookService.createPlain({
                  ...currentBookState,
                  isAfterChanges: true,
                });
                const data = {
                  user: 'Dude',
                  book: `${book.departmentCode}/${book.bookNumber}/${book.controlNumber}`,
                };
                this.emailService.isDifferentBookEmail(data);
              }
            });
          }
        }),
      (err) => {
        this.logger.error(err);
      },
    );

    // this.logger.debug('Monday to Friday at 11:30am');
  }
}
