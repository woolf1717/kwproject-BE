import { BookType } from './types';

type BookTypeNoID = Omit<BookType, 'id'>;

export function compareBooks(
  bookOne: BookType | BookTypeNoID,
  bookTwo: BookType | BookTypeNoID,
): { message: string; isDifferent: boolean } {
  const identicalPages = [];
  const differentPages = [];

  if (bookOne.sectionZero !== bookTwo.sectionZero) {
    differentPages.push('sectionZero');
  } else {
    identicalPages.push('sectionZero');
  }

  if (bookOne.sectionOneDesignation !== bookTwo.sectionOneDesignation) {
    differentPages.push('sectionOneDesignation');
  } else {
    identicalPages.push('sectionOneDesignation');
  }

  if (bookOne.sectionOneRightsList !== bookTwo.sectionOneRightsList) {
    differentPages.push('sectionOneRightsList');
  } else {
    identicalPages.push('sectionOneRightsList');
  }

  if (bookOne.sectionTwo !== bookTwo.sectionTwo) {
    differentPages.push('sectionTwo');
  } else {
    identicalPages.push('sectionTwo');
  }

  if (bookOne.sectionThree !== bookTwo.sectionThree) {
    differentPages.push('sectionThree');
  } else {
    identicalPages.push('sectionThree');
  }
  if (bookOne.sectionFour !== bookTwo.sectionFour) {
    differentPages.push('sectionThree');
  } else {
    identicalPages.push('sectionThree');
  }

  if (differentPages.length === 0) {
    return { message: 'The books are identical', isDifferent: false };
  } else {
    return { message: 'The books are different', isDifferent: true };
  }
}
