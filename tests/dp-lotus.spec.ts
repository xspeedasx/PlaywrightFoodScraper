import {test} from '@playwright/test';

test('open DP-Blue Lotus lunch page', async ({page}) => {
    await page.goto('https://www.dienospietus.lt/restoranas/blue-lotus/dienos-pietus/');

    await page.waitForTimeout(2000);
   
    const table = page.locator('.text-box');
    
    const rows = await table.locator('ul').all();
    const rowCount = rows.length;
    
    for(let i = 2; i < rowCount; i++) {
        
        const row = rows[i];
        let handle = await row.elementHandle();
        
        await handle.evaluate(node => node.setAttribute('hidden', ''))
    }
    
    // ads
    const inss = await page.locator('ins').all();
    for(const ins of inss) {
        let handle = await ins.elementHandle();
        await handle.evaluate(node => node.setAttribute('hidden', ''))
    }
    
    // add logo
    let logoElement = await table.locator('.head-galry').first()
    if(!!logoElement){
        let handle = await logoElement.elementHandle();
        await handle.evaluate(x =>
            x.innerHTML = '<div class="title resturant-title"><span><img src="/photos/2627/blue-lotus_logo.jpg" alt="Blue Lotus"/></span><h3>Blue Lotus</h3></div>'
                + x.innerHTML
        );
    }
    
    await table
        .screenshot({path: "scraped/bluelotus.png"});
    
    console.log(rows)
});
