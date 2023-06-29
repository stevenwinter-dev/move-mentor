const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the target page
  await page.goto('https://www.espn.com/fantasy/football/story/_/id/35425170/fantasy-football-ppr-rankings-2023-quarterback-running-back-wide-receiver-tight-end');

  // Wait for the h1 tag to be rendered on the page
  await page.waitForSelector('h1');

  // Extract the text content of the target h2 tag
  const quarterbacksH2 = await page.$x('//h2[contains(text(), "Quarterbacks")]');
  const quarterbacksText = await page.evaluate(element => element.textContent.trim(), quarterbacksH2[0]);

  if (quarterbacksText) {
    console.log(quarterbacksText); // Output: 'Quarterbacks'
    const anchorTags = await page.$$('h2 ~ p a');
    const quarterbacks = {};

    for (let i = 2; i < 34; i++) {
      const anchorText = await page.evaluate(element => element.textContent.trim(), anchorTags[i]);
      quarterbacks[`Player ${i - 1}`] = anchorText;
    }

    console.log(quarterbacks);
  } else {
    console.log("Unable to retrieve the target h2 tag.");
  }

  await browser.close();
})();