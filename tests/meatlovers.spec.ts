import {expect, test} from '@playwright/test';

test('open Meat Lovers fb', async ({page}) => {
    await page.goto('https://www.facebook.com/LoversPub');
    
    await page.waitForLoadState();
    await page.waitForTimeout(2000);

    const acceptCookies = page.getByText("Allow essential and optional cookies").nth(1);
    //await expect(acceptCookies).toContainText("cookies")
    if(await acceptCookies.isVisible())
        await acceptCookies.click({button: 'left'})

    const url = await page.$eval('img[src*=scontent][width="526"]', img => img.attributes.getNamedItem("src")?.value)
    await page.goto(url!)

    await page
        .locator("img")
        .screenshot({path: "scraped/ml.png"});
});
