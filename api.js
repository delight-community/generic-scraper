const axios = require('axios').default;
const {MAGIC_SECRET_URL, SECRET_KEY, CUTTLY_API_KEY, SHORTENER_BACKEND_URL, SHORTENER_BACKEND_API_KEY} = require('./secrets');

let postNewBusiness = (business) => {
    //post to secret url new businesses
    return axios({
        method: 'get',
        url: MAGIC_SECRET_URL + "/api/businesses",
        data: {
            name: "Posh Chicago",
            address: "",
            city: "Chicago",
            area: "",
            state: "IL",
            postalCode: "",
            country: "US",
            phone: "",
            lat: "0",
            lng: "0",
            price: 2,
            reserveUrl: "",
            image: "https://cdn.shopify.com/s/files/1/0165/2136/t/7/assets/logo.png?v=12558986345139760286",
            rating: ""
        },
        headers: {
            "Authorization": `Bearer ${SECRET_KEY}`
        }      
    })
};

let postNewProduct = async (businessId, category, productData, 
    {percentBack = 1, ignoredTerms = [], doFormat = true}) => {
    //post to secret url new products
    //businessId, name, description, image, price
    if(doFormat) {
        productData = await formatProductData(productData);
        if(productData == undefined) console.log("Possibly missing field");
    }
    else {
          
        const allowed = [
            'price', 
            'description', 
            'name', 
            'image', 
            'link'];
        
        productData = Object.keys(productData)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = productData[key];
            return obj;
        }, {});
    }

    // don't post empty products
    if(!productData) return undefined;
    
    // don't post products with ignored terms
    for(term of ignoredTerms) {
        if(productData?.name?.toLowerCase()?.includes(term)) {
            console.warn(`Ignoring ${productData?.name} due to inclusion of ignored term`);
            return undefined;
        }
    }

    console.log(productData);

    return axios({
        method: 'post',
        url: MAGIC_SECRET_URL + '/api/products',
        data: {
            businessId: businessId,
            category: category,
            points: productData.price * (percentBack / 100),
            ...productData
        },
        headers: {
            "Authorization": `Bearer ${SECRET_KEY}`
        }      
    }).catch(e => console.error(e?.message + ": " + e?.response?.data));
};

let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let clearAllUserPoints = async () => {
    let users = await axios({
        method: 'get',
        url: MAGIC_SECRET_URL + '/api/users',
        headers: {
            "Authorization": `Bearer ${SECRET_KEY}`
        }      
    });

    // sort by products that have this business id
    users = users?.data;

    //delete all of them
    for(user of users) {
        await axios({
            method: 'PUT',
            url: SUPER_SECRET_URL + `/api/users/${user.uid}`,
            data: {
                "points": 0
            },
            headers: {
                "Authorization": `Bearer ${SUPER_SECRET_KEY}`
            }      
        }).then(() => console.log("points deleted: " + user.firstName)).catch((e) => console.error("OH GOD NO " + e.message));
    }
}

let formatProductData = async (product) => {
    if(!product || !product.price || !product.description || !product.name || !product.image || !product.link) return undefined;
    console.log("Product before formatting: " + JSON.stringify(product));
    
    product.price = product.price.replace(/[^\d\.]/ig, '');
    // delete this when we fix it to be float lmao
    product.price = product.price * 100;
    product.price = Math.round(product.price);

    // delete this when we let it be more than 255
    if(product.description) {
        product.description = product.description.replace(/\t*/img, '');
        product.description = product.description.replace(/\n/img, ' ');
        product.description = product.description.substring(0, 249);
        let bestIndex = Math.max(product.description.lastIndexOf('.'), product.description.lastIndexOf('!'), product.description.lastIndexOf('?'));
        product.description = product.description.substring(0, bestIndex > 0 ? bestIndex + 1 : product.description.length);
    }
    // Replace insanely long image url with shortened url bc databases h8 long urls lmao
    product.image = await createBetterShortenedLink(product.image, `${product.name.replace(/\W+/img, '')}`);

    return product;
}

let deleteAllProductsFromBusiness = async (businessId) => {
    // get all products
    let products = await axios({
        method: 'get',
        url: MAGIC_SECRET_URL + '/api/products',
        headers: {
            "Authorization": `Bearer ${SECRET_KEY}`
        }      
    });

    // console.log(products?.data);

    // sort by products that have this business id
    products = products?.data?.filter(x => x.businessId === businessId);

    //delete all of them
    for(product of products) {
        await axios({
            method: 'delete',
            url: MAGIC_SECRET_URL + `/api/products`,
            data: {
                id: product.id
            },
            headers: {
                "Authorization": `Bearer ${SECRET_KEY}`
            }      
        }).then(() => console.log("product deleted: " + product.name)).catch((e) => console.error("OH GOD NO " + e.message));
    }

    // ???


    // profit!

}

let lmaoShopifyProducts = (url) => {
    return axios.get(url).then(x => x?.data?.products);
}

let getProducts = (url = MAGIC_SECRET_URL, key = SECRET_KEY) => {
    return axios({
        method: 'get',
        url: url + '/api/products',
        headers: {
            "Authorization": `Bearer ${key}`
        }      
    })
}

let createShortenedLink = async (url, newName) => {
    let shortResponse = await axios.get(`http://cutt.ly/api/api.php?key=${CUTTLY_API_KEY}&short=${url}&name=${newName + Math.round(Math.random()*200)}`);
    console.log(shortResponse?.data);
    return shortResponse?.data?.url?.shortLink;
};

let createBetterShortenedLink = async (url, newName) => {
    let body = {
        destination: url,
        branded: newName + Math.round(Math.random()*200)
    };
    let shortResponse = await axios({
        method: 'post',
        url: SHORTENER_BACKEND_URL,
        data: body,
        headers: {
            Authorization: `${SHORTENER_BACKEND_API_KEY}`
        },
      });
    console.log(shortResponse?.data);
    return shortResponse?.data?.data?.url;
};

module.exports = {
    postNewBusiness,
    postNewProduct,
    lmaoShopifyProducts,
    getProducts,
    deleteAllProductsFromBusiness,
    clearAllUserPoints,
    createShortenedLink,
    createBetterShortenedLink
}