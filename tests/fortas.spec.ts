import {test} from '@playwright/test';

test('open Fortas lunch page', async ({page}) => {
    await page.goto('https://www.fortas.eu/fortas-smoke-spirits-dienos-pietus/');

    await page.waitForTimeout(2000);
   
    const table = page.locator('#wrapper > div.ppb_wrapper > div.one.withsmallpadding.ppb_text > div > div > div > div > table > tbody');
    
    const rows = await table.locator('tr').all()
    const rowCount = rows.length;
    
    const d = new Date();
    let day = d.getDay();
    let dayIdx = Math.max(0, Math.min(4, day-1));
    const dayNames = [
       "PIRMADIENIS",
       "ANTRADIENIS",
       "TREČIADIENIS",
       "KETVIRTADIENIS",
       "PENKTADIENIS"
    ];
    const dayName = dayNames[dayIdx];
    
    let including = false;
    for(let i = 0; i < rowCount-1; i++) {
        
        const row = rows[i];
        let handle = await row.elementHandle();
        
        // if(i == day*2-2) {
        //     await handle.evaluate(x =>
        //         x.innerHTML = '<tr><td><img src="https://www.fortas.eu/wp-content/uploads/logo@2x_white.png" alt="Fortas" width="126" height="34" style="width:126px;height:34px;" /></td></tr>'
        //             + x.innerHTML
        //     );
        //     continue;
        // }
        // else if(i == day*2-1) {
        //     continue;
        // }
        let innerText = await row.innerText();
        if(innerText == dayName){
            including = true;
            await handle.evaluate(x =>
                x.innerHTML = '<tr><td><img src="https://www.fortas.eu/wp-content/uploads/logo@2x_white.png" alt="Fortas" width="126" height="34" style="width:126px;height:34px;" /></td></tr>'
                    + x.innerHTML
            );
        } else {
            for(let name of dayNames)
            {
                if(innerText == name) {
                    including = false;
                }
            }
        }        
        
        if(!including) {
            await handle.evaluate(node => node.setAttribute('hidden', ''))
        }
    }
    
    await table
        .screenshot({path: "scraped/fortas.png"});
    
    console.log(rows)
});
