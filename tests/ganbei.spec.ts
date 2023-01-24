import {test} from '@playwright/test';

test('open Ganbei lunch page', async ({page}) => {
    await page.goto('http://www.ganbeicity.lt/gan-bei-lunch.423.tx');

    await page.waitForTimeout(2000);
    
    const url = await page.$eval('tr:nth-child(2) a > img', img => img.attributes.getNamedItem("src")?.value)
    await page.goto("http://www.ganbeicity.lt" + url!)

    await page
        .locator("img")
        .screenshot({path: "scraped/ganbei.png"});
});
