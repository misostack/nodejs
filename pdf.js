const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://admin.sonnm.com/", {
    waitUntil: "networkidle2",
  });
  await page.pdf({ path: "./tmp/example2.pdf", format: "a4" });

  await browser.close();
})();
