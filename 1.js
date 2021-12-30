const Crawler = require('crawler');
const cherio = require('cherio');
const fs = require('fs');


var array = [];
var total = 0;

const c = new Crawler({
    maxConnections: 20,
    rateLimit: 10,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            const $ = res.$;
            const url = res.request.uri.href;
            const id = url.substring(url.lastIndexOf('/') + 1).replace('dkp-','');
            console.log(id);

            const x = $('script[type="application/ld+json"]');
            if (x != null){
                const data = x[0]['children'][0].data;
                const json = JSON.parse(data);
                const images = json.image;
                if (images.length > 0) {
                    const l = images[images.length-1];
                    var one = l.substring(0, l.indexOf('?'))
                    var two = one.substring(one.lastIndexOf('/') + 1);
                    array.push(two);
                } else { 
                    console.log("* skipping: ", res.request.uri.href);
                }
            } else { 
                console.log("* skipping: ", res.request.uri.href);
            }

        } 

        total -= 1;
        console.log("remaining: ", total);

        if (total == 0) { 
            fs.writeFile("objects.json", JSON.stringify(array), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        done();

    }
});


try {  
    var text = fs.readFileSync('products.txt', 'utf8').toString();
    var links = text.split(",");
    total = links.length;
    console.log("\n\n" + links.length + " products to crawl..." + "\n");
    c.queue(links);
} catch(e) {
    console.log('Error:', e.stack);
}