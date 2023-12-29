import { BookType } from './types';

export function compareBooks(
  bookOne: BookType,
  bookTwo: BookType,
): { message: string } {
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
    return { message: 'The books are identical' };
  } else {
    return { message: 'The books are different' };
  }
}

// function getTextBetweenTags(html) {
//   const $ = cheerio.load(html);
//   const textContent = [];

//   $('*').each((index, element: any) => {
//     const tagName = element.tagName;
//     const tagText = $(element).prop('innerText').trim();

//     // Exclude text within <script> tags
//     if (tagName.toLowerCase() === 'script') {
//       return;
//     }
//     if (
//       tagName.toLowerCase() === 'h2' &&
//       tagText.includes('TREŚĆ KSIĘGI WIECZYSTEJ NR')
//     ) {
//       return;
//     }
//     if (tagText) {
//       textContent.push(tagText);
//     }
//   });

//   return textContent.join('\n');
// }
