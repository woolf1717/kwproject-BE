import { Entity } from 'typeorm';

@Entity({ name: 'book' })
export class Book {
  id: number;
  title: string;
  departmentCode: string;
  bookNumber: string;
  controlNumber: string;
  sectionZero: string;
  sectionOneDesignation: string;
  sectionOneRightsList: string;
  sectionTwo: string;
  sectionThree: string;
  sectionFour: string;
  isMonitored: boolean;
}
