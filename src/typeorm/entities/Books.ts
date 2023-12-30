import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  departmentCode: string;

  @Column()
  bookNumber: string;

  @Column()
  controlNumber: string;

  @Column('text')
  title: string;

  @Column('longtext')
  sectionZero: string;

  @Column('longtext')
  sectionOneDesignation: string;

  @Column('longtext')
  sectionOneRightsList: string;

  @Column('longtext')
  sectionTwo: string;

  @Column('longtext')
  sectionThree: string;

  @Column('longtext')
  sectionFour: string;

  @Column('boolean', { default: false })
  isMonitored: boolean = false;
}
