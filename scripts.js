const {createShortenedLink, postNewBusiness, postNewProduct, lmaoShopifyProducts, getProducts, deleteAllProductsFromBusiness, clearAllUserPoints} = require('./api');
const {MAGIC_SECRET_URL, SECRET_KEY, CUTTLY_API_KEY, SHORTENER_BACKEND_URL, SHORTENER_BACKEND_API_KEY, PROD_SECRET_URL, DEV_SECRET_URL, PROD_SECRET_API_KEY, DEV_SECRET_API_KEY, ENV} = require('./secrets');
const {
    productPageURLs,
    selectorConfigs,
    bizIDsDev,
    bizIDsProd
} = require('./configs');
const puppeteer = require('puppeteer');

// from dev to prod
let moveProductsFromDevToProd = async (bizName) => {
    let products = await getProducts(DEV_SECRET_URL, DEV_SECRET_API_KEY).then(res => res?.data).catch(e => console.error(e.message + " " + e.response.data));
    products = products.filter(x => x.business.id === bizIDsDev[bizName]);

    for (product of products) {
        await postNewProduct(bizIDsProd[bizName], category, product, {doFormat: false}).then((res) => console.log(res?.data)).catch("Product failed: " + product.name);
    }
}

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
        try {
        await page.goto(pageURL);
        console.log(`Checking: ${pageURL}`);
        let productDetails = await page.evaluate(({selectorConfig, pageURL}) => {
            // Grab all data from the product page that we want in our database
            let description = document?.querySelector(selectorConfig.description)?.innerText;
            let image = document?.querySelector(selectorConfig.image)?.src.replace('100x', '2000x');
            let price = document?.querySelector(selectorConfig.price)?.content || document?.querySelector(selectorConfig.price)?.textContent;
            let name = document?.querySelector(selectorConfig.name)?.textContent;
            let link = pageURL;

            console.log({
                description, image, price, name, link
            });
            return {
                description, image, price, name, link
            };
        }, {selectorConfig, pageURL});

        console.log(`Checked: ${pageURL}`);
        productData.push(productDetails); 
        }
        catch (e) {
            console.log(e);
        }
    }
    
    // close it out, return all the product data
    await browser.close();
    return productData;

}

let scrape = async (businessName, ignoredTerms, percentBack, deleteExisting = false) => {

    let bizId = ENV === "PROD" ? bizIDsProd[businessName] : bizIDsDev[businessName];
    if(deleteExisting) {
        await deleteAllProductsFromBusiness(bizId);
    }

    let productsByCategory = {};
    
    for(const [url, category] of Object.entries(productPageURLs[businessName])) {
        if(productsByCategory[category]) {
            productsByCategory[category].push(await getAllProductData(url, selectorConfigs[businessName]));
        }
        else {
            productsByCategory[category] = await getAllProductData(url, selectorConfigs[businessName]);
        }
    }


    for(const [category, products] of Object.entries(productsByCategory)) {
        for (product of products) {
            console.log(product);
            await postNewProduct(bizId, category, product, {percentBack: percentBack, ignoredTerms: ignoredTerms}).then((res) => console.log(res?.data)).catch("Product failed: " + product.name);
        }
    }

}

module.exports = {
    moveProductsFromDevToProd,
    scrape
};