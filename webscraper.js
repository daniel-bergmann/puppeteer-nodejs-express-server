const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.listen(5000, () => {
    console.log('listening to port 5000')
})

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)

    // Book image
    // This is an image tag so you need to have 'src' and 'imgUrl'
    const [el] = await page.$x('//*[@id="imgBlkFront"]')
    const src = await el.getProperty('src')
    const imgUrl = await src.jsonValue();


    // Book title
    // This is text so you need to have 'txt' and 'title'
    const [el2] = await page.$x('//*[@id="productTitle"]')
    const txt = await el2.getProperty('textContent')
    let title = await txt.jsonValue();
    title = title.trim();

    // Book price
    // This is text so you need to have 'txt' and 'rawTxt'
    const [el3] = await page.$x('//*[@id="price"]')
    const txt2 = await el3.getProperty('textContent')
    const price = await txt2.jsonValue();

    // Server side rendering of data
    // keep that in comments for future reference

    // const html = `
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Nodejs web scraper project</title>
    //     </head>
    //     <body>
    //         <img src="${imgUrl}" alt="">
    //         <h1>${title}</h1>
    //         <h3>${price}</h3>
    //     </body>
    //     </html>
    // `;

    // app.get('/', (req, res) => {
    //     console.log('works')
    //     res.send(html);
    // })

    // data API

       app.get('/api', (req, res) => {
        console.log('works')
        res.send({imgUrl, title, price});
    })


    console.log({imgUrl, title, price})
    browser.close();
}

scrapeProduct('https://www.amazon.com/dp/1524761338/ref=s9_acsd_hps_bw_c2_x_2_i?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-5&pf_rd_r=G5BSHF8Q1HXNTTECGAZ1&pf_rd_t=101&pf_rd_p=97ed968c-3363-47c3-9f06-d9c5e3a1a2b5&pf_rd_i=13270229011');

