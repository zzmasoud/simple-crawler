const Crawler = require('crawler');
const cherio = require('cherio');
const fs = require('fs');


var array = [];
var total = 0;

const c = new Crawler({
    maxConnections: 10,
    rateLimit: 100,
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
                    
                    if(array.indexOf(two) == -1){
                        console.log("***** CHECK THIS: ", l);
                    } 

                } else { 
                    console.log("* skipping: ", res.request.uri.href);
                }
            } else { 
                console.log("* skipping: ", res.request.uri.href);
            }
        } 

        total -= 1;
        console.log("remaining: ", total);
       
        done();

    }
});


try {

    fs.readFile('objects.json', 'utf8', (err, data) => {

        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {

        // parse JSON string to JSON object
        array = JSON.parse(data);
        }

    });



    var text = fs.readFileSync('products.txt', 'utf8').toString();
    var links = text.split(",");
    var links = links.slice(1250, 1270);
    console.log(links);
    total = links.length;
    console.log("\n\n" + links.length + " products to crawl..." + "\n");
    // c.queue(links);
} catch(e) {
    console.log('Error:', e.stack);
}