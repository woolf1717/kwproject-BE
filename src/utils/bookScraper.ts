import puppeteer from 'puppeteer';

const url =
  'https://przegladarka-ekw.ms.gov.pl/eukw_prz/KsiegiWieczyste/wyszukiwanieKW';

export const bookScraper = async (
  departmentCode,
  bookNumber,
  controlNumber,
) => {
  const navFix = (content) => {
    const oldNav = /<table id="nawigacja">[\s\S]*?<\/table>/;

    const oldReturnButton = /<table width="100%">[\s\S]*?<\/table>/;
    const newReturnButton =
      '<table width="100%"><tbody><tr><td width="100%" align="left"><form method="get" action="./okladka.html"><input value="Powrót" type="submit"></form></td></tr></tbody></table>';

    const oldDateDisplay =
      /<h2 style="color:white" align="center">[\s\S]*?<\/h2>/;
    const newDateDisplay = `<h2 style="color:black" align="center">TREŚĆ KSIĘGI WIECZYSTEJ NR ${departmentCode}/${bookNumber}/${controlNumber}, STAN Z DNIA 2023-12-06 {*uzupełnij jeżeli się da*}</h2> `;

    // const f5Cspm = /<script id="f5_cspm" >[\s\S]*?<\/script>/;

    // const someScript =
    //   /<script type="text\/javascript">\s*\(function\(\)\{\s*window\.JCaA=!!window\.JCaA;\s*try\(\(function\(\)\{\s*var J=-1;[\s\S]*?}catch\(x\){}\s*\}\)\(\);\s*}\)\(\);\s*<\/script>/;
    const returnButton =
      '<table width="100%"><tbody><tr><td width="100%" align="left"><form method="get" action="./okladka.html"><input value="Powrót" type="submit"></form></td></tr></tbody></table>';
    const output = content
      .replace(oldNav, '')
      .replace(oldDateDisplay, newDateDisplay)
      .replace(oldReturnButton, newReturnButton)
      .replace(/.*?<body[^>]*>|<\/body>.*/gs, '')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<h2\b[^<]*(?:(?!<\/h2>)<[^<]*)*<\/h2>/gi, '')
      .replace(returnButton, '');

    return output;
  };

  const getTitle = (content) => {
    const output = content.replace(/.*?<h2[^>]*>|<\/h2>.*/gs, '');

    return output;
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  );
  await page.goto(url);
  await page.waitForSelector('#kodWydzialuInput');
  await page.waitForSelector('#numerKsiegiWieczystej');
  await page.waitForSelector('#cyfraKontrolna');
  await page.type('#kodWydzialuInput', departmentCode);
  await page.type('#numerKsiegiWieczystej', bookNumber);
  await page.type('#cyfraKontrolna', controlNumber);
  await page.click('#wyszukaj');
  await page.waitForSelector('#przyciskWydrukZupelny');
  await page.click('#przyciskWydrukZupelny');
  // TO DO: change waiting for selector to something else

  // sectionZero
  await page.waitForTimeout(2000);
  const content = await page.content();
  const sectionZero = await navFix(content);
  const title = await getTitle(content);
  console.log('sectionZero done');

  // sectionOneDesignation
  await page.click('input[type="submit"][value="Dział I-O"]');
  await page.waitForTimeout(3000);
  const content2 = await page.content();
  const sectionOneDesignation = await navFix(content2);

  console.log('sectionOneDesignation done');

  // sectionOneRightsList
  await page.click('input[type="submit"][value="Dział I-Sp"]');
  await page.waitForTimeout(3000);
  const content3 = await page.content();
  const sectionOneRightsList = await navFix(content3);

  console.log('sectionOneRightsList done');

  // sectionTwo
  await page.click('input[type="submit"][value="Dział II"]');
  await page.waitForTimeout(3000);
  const content4 = await page.content();
  const sectionTwo = await navFix(content4);

  console.log('sectionTwo done');

  // sectionThree
  await page.click('input[type="submit"][value="Dział III"]');
  await page.waitForTimeout(3000);
  const content5 = await page.content();
  const sectionThree = await navFix(content5);

  console.log('sectionThree done');
  // sectionFour
  await page.click('input[type="submit"][value="Dział IV"]');
  await page.waitForTimeout(3000);
  const content6 = await page.content();
  const sectionFour = await navFix(content6);

  console.log('sectionFour done');

  console.log('done');
  await browser.close();

  return {
    departmentCode,
    bookNumber,
    controlNumber,
    title,
    sectionZero,
    sectionOneDesignation,
    sectionOneRightsList,
    sectionTwo,
    sectionThree,
    sectionFour,
  };
};
