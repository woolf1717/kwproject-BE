import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

import { CreateBookDto } from 'src/book/dto/create-book.dto';

@Injectable()
export class ValidateCreateBookPipe implements PipeTransform {
  transform(value: CreateBookDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateBookPipe');
    console.log(value);
    console.log(metadata);

    return value;
  }
}
