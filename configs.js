const productPageURLCitySoles = {
    "https://www.citysoles.com/women.html?product_list_limit=50": "shoes"
}

const selectorConfigCitySoles = {
    productListLinkSelector: "a.product-item-link",
    name: "#maincontent > div.columns.container > div > div.product-info-main > div.product-info-price > div.page-title-wrapper.product > div > h2 > span",
    price: 'meta[itemprop="price"]',
    description: "div.product-info-main > div.product.attribute.sku > div",
    image: ".fotorama__active > img",
};

const productPageURLFirefly = {
    "https://www.fireflyfiberarts.com/yarn": "yarn"
}

const selectorConfigFirefly = {
    productListLinkSelector: "a.product",
    name: "h1.product-title",
    price: ".sqs-money-native",
    description: "#productDetails > div.product-excerpt > p:nth-child(1)",
    image: ".sqs-gallery-design-stacked-slide > img",
};

// const productPageURLRareDragons = "https://www.raredragons.shop/store/c24/Mugs%2C_Bags_%26_Blankets.html";
// const selectorConfigRareDragons = {
//     productListLinkSelector: ".wsite-com-category-product-link",
//     name: "#wsite-com-product-title",
//     price: ".wsite-com-product-price-amount",
//     description: "#wsite-com-product-short-description > div",
//     image: ".wsite-com-product-images-main-image",
// };

// const productPageURLPoshChicago = "https://poshchicago.com/collections/all?view=10";
// const selectorConfigPoshChicago = {
//     productListLinkSelector: "#collection > div.grid > div > a",
//     name: "#title",
//     price: "#price > span",
//     description: "#product_narrative",
//     image: "#src",
// };

//https://dear72.com/makeup/?limit=100

const productPageURLDear72 = {
    "https://dear72.com/makeup/?limit=100": "makeup"
};

const selectorConfigDear72 = {
    productListLinkSelector: "article > figure > a",
    name: "h1.productView-title",
    price: ".price--withoutTax",
    description: "div.productView-description > p > span",
    image: ".productView-image--default",
};

// colorado glasses
const productPageURLColoradoGlasses = {
    "https://coloradoglasses.com/collections/main": "glasses"
};

const selectorConfigColoradoGlasses = {
    productListLinkSelector: "#Collection > ul > li > div > a",
    name: ".product-single__title",
    price: ".price-item--regular",
    description: ".product-single__description",
    image: "img.zoomImg",
};

// blendbee
const productPageURLBlendBee = {
    "https://blendbee.com/collections/teaware": "dishware",
    "https://blendbee.com/collections/all-premade-blends?page=5": "tea"
}

const selectorConfigBlendBee = {
    productListLinkSelector: ".shop-item > a",
    name: "div.product-info-top > h1",
    price: "#ProductPrice",
    description: "div.accordion-wrapper-content.svelte-1uy1vbc",
    image: "#ProductPhotoImg",
};

// blendbee
const productPageURLModestMix = {
    "https://modestmix.com/shop/": "tea"
};

const selectorConfigModestMix = {
    productListLinkSelector: ".woocommerce-LoopProduct-link",
    name: ".product_title",
    price: 'div.summary.entry-summary > form:nth-child(4) > table > tbody > tr > td:nth-child(2) > span > span',
    description: ".woocommerce-product-details__short-description > p",
    image: "div.woocommerce-product-gallery__image.flex-active-slide > a > img",
};


// blendbee
const productPageURLBawkBox = {
    "https://thechickenbawks.com/collections/bawkshop": "shirts"
}

const selectorConfigBawkBox = {
    productListLinkSelector: "div.product-top > .product-link",
    name: ".product-single__title-text",
    price: '.money',
    description: ".product-single__content-text",
    image: ".product-single__photo__img",
};

//easydaycafe
const productPageURLEasyDayCafe = {
    "https://easydaycafe.com/collections/coffee": "coffee",
    "https://easydaycafe.com/collections/mugs-flasks": "dishware",
    "https://easydaycafe.com/collections/coffee-machines": "electronics"
}

const selectorConfigEasyDayCafe = {
    productListLinkSelector: ".product-info__caption",
    name: "h1.product_name",
    price: '.current_price > .money',
    description: ".description.bottom",
    image: ".image__container > img",
}


let productPageURLs = {
    "blendbee": productPageURLBlendBee,
    "citysoles": productPageURLCitySoles,
    "dear72": productPageURLDear72,
    "firefly": productPageURLFirefly,
    // "poshchicago": productPageURLPoshChicago,
    "modestmix": productPageURLModestMix,
    "coloradoglasses": productPageURLColoradoGlasses,
    "bawkbox": productPageURLBawkBox,
    "easydaycafe": productPageURLEasyDayCafe
}

let selectorConfigs = {
    "blendbee": productPageURLBlendBee,
    "citysoles": selectorConfigCitySoles,
    "dear72": selectorConfigDear72,
    "firefly": selectorConfigFirefly,
    // "poshchicago": selectorConfigPoshChicago,
    "modestmix": selectorConfigModestMix,
    "coloradoglasses": selectorConfigColoradoGlasses,
    "bawkbox": selectorConfigBawkBox,
    "easydaycafe": selectorConfigEasyDayCafe
}

let bizIDsProd = {
    "blendbee": "",
    "citysoles": "",
    "dear72": "",
    "firefly": "",
    "poshchicago": "",
    "modestmix": "",
    "coloradoglasses": "",
    "bawkbox": "4m3f2bd4v",
    "easydaycafe": "41zgoifuw"
}

let bizIDsDev = {
    "blendbee": "",
    "citysoles": "",
    "dear72": "",
    "firefly": "",
    "poshchicago": "",
    "modestmix": "",
    "coloradoglasses": "",
    "bawkbox": "7sxd2bh76",
    "easydaycafe": "gyjrdej3b",
}


module.exports = {
    productPageURLs,
    selectorConfigs,
    bizIDsProd,
    bizIDsDev
}