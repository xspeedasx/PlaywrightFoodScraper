import {expect, test} from '@playwright/test';

test('open Shimai fb', async ({page}) => {
    await page.goto('https://www.facebook.com/Bitenu1');

    const acceptCookies = page.getByText("Allow essential and optional cookies").nth(1);
    await expect(acceptCookies).toContainText("cookies")
    await acceptCookies.click({button: 'left'})

    await page.waitForTimeout(2000);
    
    const url = await page.$eval('div[style="padding-top: calc(100%);"] div:nth-child(3) img', img => img.attributes.getNamedItem("src")?.value)
    await page.goto(url!)

    await page
        .locator("img")
        .screenshot({path: "scraped/shimai.png"});
});
