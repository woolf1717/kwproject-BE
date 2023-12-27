import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  departmentCode: string;
  @IsNotEmpty()
  bookNumber: string;
  @IsNotEmpty()
  controlNumber: string;
}
