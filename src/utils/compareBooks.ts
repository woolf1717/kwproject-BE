import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

function getTextBetweenTags(html) {
  const $ = cheerio.load(html);
  const textContent = [];

  $('*').each((index, element: any) => {
    const tagName = element.tagName;
    const tagText = $(element).prop('innerText').trim();

    // Exclude text within <script> tags
    if (tagName.toLowerCase() === 'script') {
      return;
    }
    if (
      tagName.toLowerCase() === 'h2' &&
      tagText.includes('TREŚĆ KSIĘGI WIECZYSTEJ NR')
    ) {
      return;
    }
    if (tagText) {
      textContent.push(tagText);
    }
  });

  return textContent.join('\n');
}
export function compareFolders(folder1, folder2) {
  const files1 = getFiles(folder1);
  const files2 = getFiles(folder2);
  let diferences = 0;

  const uniqueFiles1 = files1.filter((file) => !files2.includes(file));
  const uniqueFiles2 = files2.filter((file) => !files1.includes(file));

  console.log('Files unique to folder 1:', uniqueFiles1);
  console.log('Files unique to folder 2:', uniqueFiles2);

  // Compare the text content of common files
  const commonFiles = files1.filter((file) => files2.includes(file));
  commonFiles.forEach((file) => {
    const textContent1 = getTextBetweenTags(
      fs.readFileSync(path.join(folder1, file), 'utf8'),
    );
    const textContent2 = getTextBetweenTags(
      fs.readFileSync(path.join(folder2, file), 'utf8'),
    );
    // Compare text content using your custom logic
    if (textContent1 === textContent2) {
      console.log(`File ${file} has identical text content in both folders.`);
    } else {
      diferences++;
      console.log(`File ${file} has different text content in both folders.`);
    }
  });
  if (diferences === 0) {
    return true;
  } else {
    return false;
  }
}

function getFiles(folder) {
  return fs.readdirSync(folder).filter((file) => file.endsWith('.html'));
}
