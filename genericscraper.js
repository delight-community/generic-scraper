const puppeteer = require('puppeteer');

let getAllProductData = async (productPageURL) => {

    // get puppeteer started
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // navigate to a main page that holds a list of product urls
    await page.goto(productPageURL);

    // grab all product urls off the page
    let pages = await page.evaluate(() => {
        // Main page of website that holds all product links
        return Array.from(document.querySelectorAll('a.product-item-link'), x => x.href).filter(url => url);
    });

    let productData = [];

    // grab product data from each page
    for(pageURL of pages) {
        await page.goto(pageURL);
        console.log(`Checking: ${pageURL}`);
        let productDetails = await page.evaluate(() => {
            // Grab all data from the product page that we want in our database
            let description = document?.querySelector('#maincontent > div.columns.container > div > div.product-info-main > div.product.attribute.sku > div')?.textContent;
            let image = document?.querySelector('.fotorama__active > img')?.src;
            let price = document?.querySelector('meta[itemprop="price"]')?.content;
            let name = document?.querySelector('#maincontent > div.columns.container > div > div.product-info-main > div.product-info-price > div.page-title-wrapper.product > div > h2 > span')?.textContent;
            return {
                description, image, price, name
            };
        });
        console.log(`Checked: ${pageURL}`);
        productData.push(productDetails); 
    }
    
    // close it out, return all the product data
    await browser.close();
    return productData;

}

let productPageURL= "https://www.citysoles.com/women.html?product_list_limit=all";

// if this doesn't work yell at Totally, mosa
getAllProductData(productPageURL).then(console.log);