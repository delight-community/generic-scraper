const puppeteer = require('puppeteer');

let getAllProductData = async (productPageURL, selectorConfig) => {

    // get puppeteer started
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // navigate to a main page that holds a list of product urls
    await page.goto(productPageURL);

    // grab all product urls off the page
    let pages = await page.evaluate((selectorConfig) => {
        // Main page of website that holds all product links
        return Array.from(document.querySelectorAll(selectorConfig.productListLinkSelector), x => x.href).filter(url => url);
    }, selectorConfig);

    let productData = [];

    // grab product data from each page
    for(pageURL of pages) {
        await page.goto(pageURL);
        console.log(`Checking: ${pageURL}`);
        let productDetails = await page.evaluate((selectorConfig) => {
            // Grab all data from the product page that we want in our database
            let description = document?.querySelector(selectorConfig.description)?.textContent;
            let image = document?.querySelector(selectorConfig.image)?.src;
            let price = document?.querySelector(selectorConfig.price)?.content || document?.querySelector(selectorConfig.price)?.textContent;
            let name = document?.querySelector(selectorConfig.name)?.textContent;
            return {
                description, image, price, name
            };
        }, selectorConfig);
        console.log(`Checked: ${pageURL}`);
        productData.push(productDetails); 
    }
    
    // close it out, return all the product data
    await browser.close();
    return productData;

}

let productPageURLCitySoles = "https://www.citysoles.com/women.html?product_list_limit=all";

let selectorConfigCitySoles = {
    productListLinkSelector: "a.product-item-link",
    name: "#maincontent > div.columns.container > div > div.product-info-main > div.product-info-price > div.page-title-wrapper.product > div > h2 > span",
    price: 'meta[itemprop="price"]',
    description: "#maincontent > div.columns.container > div > div.product-info-main > div.product.attribute.sku > div",
    image: ".fotorama__active > img",
};

let productPageURLFirefly = "https://www.fireflyfiberarts.com/yarn";

let selectorConfigFirefly = {
    productListLinkSelector: "a.product",
    name: "h1.product-title",
    price: ".sqs-money-native",
    description: "#productDetails > div.product-excerpt > p:nth-child(1)",
    image: "img.loaded",
};

// if this doesn't work yell at Totally, mosa
getAllProductData(productPageURLFirefly, selectorConfigFirefly).then(console.log);