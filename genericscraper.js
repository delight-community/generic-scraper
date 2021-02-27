const {createShortenedLink, postNewBusiness, postNewProduct, lmaoShopifyProducts, getProducts, deleteAllProductsFromBusiness, clearAllUserPoints} = require('./api');
const {
    productPageURLs,
    selectorConfigs,
    bizIDsDev,
    bizIDsProd
} = require('./configs');

const {
    moveProductsFromDevToProd,
    scrape
} = require('./scripts');
var axios = require("axios").default;

// if this doesn't work yell at Totally, mosa
// scrape
(async () => {

    let businessName = "easydaycafe";
    let ignoredTerms = [];
    let percentBack = 30;
    let deleteExisting = true;

    scrape(businessName, ignoredTerms, percentBack, deleteExisting);
    
    //moveProductsFromDevToProd(businessName);

})()



//  (async () => {
//     let products = await lmaoShopifyProducts('https://google.com/products.json').then(console.log).catch(console.error);
//     console.log(products);
// })()

// (async () => {
//     let biz = postNewBusiness().then(res => console.log(res?.data)).catch(e => console.error(e.message + " " + e.response.data));
// })()


// (async () => {
//     let biz = getProducts().then(res => console.log(res?.data)).catch(e => console.error(e.message + " " + e.response.data));
// })()

// (async () => {
//     let short = await createShortenedLink("https://whatever.com", "delight-lmao");
//     console.log(short);
// })();