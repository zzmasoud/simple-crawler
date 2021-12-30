const Crawler = require('crawler');
const cherio = require('cherio');
const fs = require('fs');
const download = require('images-downloader').images;
const dest = 'x';


var array = [];

fs.readFile('objects.json', 'utf8', (err, data) => {

        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {

        // parse JSON string to JSON object
        array = JSON.parse(data);

        const links = array.map(function(l) {
                return "https://dkstatics-public.digikala.com/digikala-products/" + l.substring(0, l.indexOf('?')) + "?x-oss-process=image/resize,h_500/quality,q_10";
             });
        console.log(links);

        download(links, dest)
        .then(result => {
            console.log(result);   
        })
        .catch(error => console.log("downloaded error", error))

        }

});
