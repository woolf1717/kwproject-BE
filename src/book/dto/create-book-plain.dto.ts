import { IsNotEmpty } from 'class-validator';

export class CreateBookPlainDto {
  @IsNotEmpty()
  departmentCode: string;
  @IsNotEmpty()
  bookNumber: string;
  @IsNotEmpty()
  controlNumber: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  sectionZero: string;
  @IsNotEmpty()
  sectionOneDesignation: string;
  @IsNotEmpty()
  sectionOneRightsList: string;
  @IsNotEmpty()
  sectionTwo: string;
  @IsNotEmpty()
  sectionThree: string;
  @IsNotEmpty()
  sectionFour: string;
  @IsNotEmpty()
  isMonitored?: boolean;
  @IsNotEmpty()
  isAfterChanges?: boolean;
}
