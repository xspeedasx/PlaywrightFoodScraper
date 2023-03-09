import {expect, test} from '@playwright/test';

test('open Guru fb', async ({page}) => {
    await page.goto('https://www.facebook.com/salotubaras');
    
    await page.waitForLoadState();
    await page.waitForTimeout(2000);

    const acceptCookies = page.getByText("Allow essential and optional cookies").nth(1);
    
    if(await acceptCookies.isVisible())
        await acceptCookies.click({button: 'left'})

    // find first image with >500 width
    let allImages = await page.locator('img[src*=scontent]').all();
    for(let img of allImages)
    {
        let w = +(await img.getAttribute("width"));
        if(w > 500)
        {
            const url = await img.getAttribute("src");
            await page.goto(url!)

            await page
                .locator("img")
                .screenshot({path: "scraped/guru.png"});
            return;
        }
    }
    
    
});
