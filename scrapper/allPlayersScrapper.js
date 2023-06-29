const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the target page
  await page.goto('https://www.espn.com/fantasy/football/story/_/id/35425170/fantasy-football-ppr-rankings-2023-quarterback-running-back-wide-receiver-tight-end');

  // Wait for the h1 tag to be rendered on the page
  await page.waitForSelector('h1');

  // Extract the text content of the target h2 tag (Running Backs)
  const runningBacksH2 = await page.$x('//h2[contains(text(), "Running backs")]');
  const runningBacksText = await page.evaluate(element => element.textContent.trim(), runningBacksH2[0]);

  if (runningBacksText) {
    console.log(runningBacksText); // Output: 'Running backs'
    const runningBackAnchorTags = await page.$$('h2 ~ p a');
    const players = { Players: [] };

    for (let i = 0; i < runningBackAnchorTags.length; i++) {
      const anchorText = await page.evaluate(element => element.textContent.trim(), runningBackAnchorTags[i]);

      // Check if the anchor text has 2 or 3 words
      const words = anchorText.split(' ');
      if (words.length >= 2 && words.length <= 3) {
        players.Players.push(anchorText);
      }
    }

    // Sort the players array alphabetically
    players.Players.sort();

    // Write the players array to a JSON file
    const jsonData = JSON.stringify(players);
    fs.writeFileSync('players.json', jsonData, 'utf8');
    console.log('players.json file created/updated.');
  } else {
    console.log("Unable to retrieve the target h2 tag (Running backs).");
  }


  await browser.close();
})();
