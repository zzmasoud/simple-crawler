const Crawler = require('crawler');
const cherio = require('cherio');
const fs = require('fs');


var WriteStream  = fs.createWriteStream("products.txt", "UTF-8");

const c = new Crawler({
    maxConnections: 10,
    rateLimit: 1000,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            console.log("finding products of page " + res.request.uri.href);
            const $ = res.$;
            const links = $('a[class="c-product-box__img c-promotion-box__image js-url js-product-item js-product-url"]');
            links.each(function(index, link) {
                const id = link['attribs']['data-adro-ad-click-id'];
                const x = "https://www.digikala.com/product/dkp-" + id;
                WriteStream.write(x);
                WriteStream.write(",");
            });
        }
        done();
    }
});


var links = [];

console.log("generating products.txt .......");

Array.from({length: 46}, (_, i) => i + 1).forEach(page => {  
  links.push(`https://www.digikala.com/treasure-hunt/products/?pageno=${page}`);  
});
c.queue(links);

