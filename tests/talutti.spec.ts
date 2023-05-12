import {test} from '@playwright/test';

test('open Talutti fb', async ({page}) => {
    const fs = require("fs");
    await page.goto('https://www.facebook.com/TaluttiBakesNShakes');

    await page.waitForLoadState();
    await page.waitForTimeout(2000);

    const acceptCookies = page.getByText("Allow essential and optional cookies").nth(1);

    if(await acceptCookies.isVisible())
        await acceptCookies.click({button: 'left'})

    const locatorBase = "span:is(:has(img[alt='🍕']), :has(img[alt='🍔'])):has(img[alt='📍'])";

    await page
        .locator(locatorBase + " div[role='button']")
        .click({button: "left"})

    const text = await page.locator(locatorBase).innerHTML()

    const wrapHtmlA = '<div style=\"width:600px\">';
    const header = text.slice(0, text.indexOf("Pramonės pr. 16a"))
    const pietus = text.slice(text.indexOf("Vilniaus g.35, VILNIUS:"))
    const wrapHtmlB = '</div>';

    await fs.writeFile('scraped/talutti.html', wrapHtmlA + header + "\n" + pietus + wrapHtmlB, function (err) {
        if (err) throw err;

        console.log("File was saved.");
    });

    const dir = process.cwd();
    await page.goto('file://'+dir+'/scraped/talutti.html');

    await page
        .locator("body > div")
        .screenshot({path: "scraped/talutti.png"});

    await fs.unlink('scraped/talutti.html', function (err) {
        if (err) throw err;

        console.log("File was removed.");
    })
});
