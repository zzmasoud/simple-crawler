
# simple-crawler
simple web crawler to use in Digikala's black friday contest.

# The contest

On the occasion of Black Friday, Digikala held a contest in which you had to find a discount code that was accidentally inserted on one of the photos of the products and use it immediately.
The number of products was very large. (In total over 16,000 photos), so opening the product page and seeing each photo and moving between the pages was not a good idea at all.

I decided to write a crawler so that I could quickly download the photos of all the products for me and I would just spend my time reviewing the photos and here is how i done it without having professional web development knowledge!

## Product info
Assuming you are visiting this page:
https://www.digikala.com/product/dkp-6520212
By using inspect element I found needed data here:

    <script type="application/ld+json"> {
    "@context": "https://www.schema.org",
    "@type": "Product",
    "name": "کوله پشتی گوگانا مدل 4029DBL",
    "alternateName": null,
    "image": [
        "https://dkstatics-public.digikala.com/digikala-products/b0d147e44ac87a4fad9e10d80010ea0853a03683_1632223547.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/b98995f8be60b56ebfe9c94bebdaca71b455b494_1632223551.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/6e74170fa98f21fd4a69b913cbde6db8c69dc855_1632223573.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/38a71580c207feda90c63993cbf1381aa8e1285f_1632223579.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/c65ff7774cc0773d0104f1e810a1f01202d6d390_1632223586.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/a17e8146e85dd591cf5c3d43a043fcc2a0a574a1_1632223593.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/ab083d72316307494caa732de2369b0b00c3c731_1632223599.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/47d0049ef7ae40cb09272ea98ff0690ec39843e8_1632223608.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/9ef79bf690dc0e7c873860a67e4db9d5d9bc7c1c_1632223619.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/039f4d0f909041a03e296f38476d7867d3f7daad_1632223623.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/66a10b018ec93ecb39adf603cba20b547f29599d_1632223629.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/e79ccbeb2ef5fe41f7705bcda1654b8a3b3a1964_1632223633.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/24b8e5356f265ceebc0026f6b6e4432eaa5ee072_1632223636.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/0bee68448437faac585a41b41cbbcb54e1ef92ee_1632223638.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15",
        "https://dkstatics-public.digikala.com/digikala-products/89da157e5fedb6c2a4f987340cbb95329c4b0110_1638886779.jpg?x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15"
    ],
    "description": "",
    "sku": 6520212,
    "mpn": 6520212,
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 4.4,
        "reviewCount": 11,
        "bestRating": 5,
        "worstRating": 0
    },
    "brand": {
        "@type": "Thing",
        "name": "گوگانا"
    },
    "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "IRR",
        "lowPrice": 1990000,
        "highPrice": 1990000,
        "offerCount": 3,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "IRR",
            "price": 1990000,
            "itemCondition": "https://schema.org/UsedCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "دیجی‌کالا"
            }
        }
    },
    "review": {
        "@type": "Review",
        "author": "سروش L",
        "datePublished": "2021-12-28",
        "description": "جنسش برزنته تا حدودی مانع نفوذ اب می شود. نازک اما سبک هست و وقتی حملش میکنی به لطف لایه اسفنجی بند دوش اذیت نمیشی. در فروش ویژه مناسب هست",
        "name": "کیف",
        "reviewRating": {
            "@type": "Rating",
            "bestRating": 5,
            "ratingValue": 3,
            "worstRating": 0
        }
    }
} </script>


### Getting image URLs

Here is the crawler to parsing the element and saving image URLs to array:

    const c = new Crawler({
	    maxConnections: 20,
	    rateLimit: 10,
	    callback: (error, res, done) => {
	        if (error) {
	            console.log(error);
	        } else {
	            const $ = res.$;
	            const url = res.request.uri.href;
	            const id = url.substring(url.lastIndexOf('/') + 1).replace('dkp-','');
	            console.log(id);

	            const x = $('script[type="application/ld+json"]');
	            if (x != null) {
	                const data = x[0]['children'][0].data;
	                const json = JSON.parse(data);
	                const images = json.image;
	                if (images.length > 0) {
	                    const l = images[images.length-1];
	                    var one = l.substring(0, l.indexOf('?'))
	                    var imageUrl = one.substring(one.lastIndexOf('/') + 1);
	                    array.push(imageUrl);
	                } else { 
	                    console.log("* skipping: ", res.request.uri.href);
	                }
	            } else { 
	                console.log("* skipping: ", res.request.uri.href);
	            }
	        } 
	        done();
	    }
    });

Things to mention:
 - some products have a single image, so checking length is to skip them, because I was sure they will not adding discount code there!
 - removed filters applied to images, by removing query string from URLs. e.g : (`x-oss-process=image/resize,h_1600/quality,q_80/watermark,image_ZGstdy8xLnBuZw==,t_90,g_nw,x_15,y_15`)


### Saving URLs
At the end of fetching all URLs, saved them to JSON file:

    fs.writeFile("objects.json", JSON.stringify(array), function(err) {
	    if (err) {
	        console.log(err);
	    }
    });

## List of products
In the previous step, I was able to successfully save all the photos of the products. But the more important question was how to navigate between product pages and save their links?
So I wrote a more general script that crawls all the pages and prepares for the previous script so that it can run separately for each product:

    var WriteStream  = fs.createWriteStream("products.txt", "UTF-8");
    
	const c = new Crawler({
	    maxConnections: 10,
	    rateLimit: 1000,
    
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

Things to mention:

 - here is how I generated all pages URL:
 `var links = [];
Array.from({length: 46}, (_, i) => i + 1).forEach(page => {  
  links.push(`https://www.digikala.com/treasure-hunt/products/?pageno=${page}`);  
});
c.queue(links);`

### Downloading images
To download the photos, I used different methods, each with a different scenario:

#### 1. Downloading all URLs from a file:

    const c = new Crawler({
	    encoding: null,
	    jQuery: false,
	    maxConnections: 50,
	    rateLimit: 0,
	    callback: (error, res, done) => {
	        console.log(res.request.uri.href);
	        if (error) {
	            console.log(error);
	        } else {
	            const url = res.options.uri.substring(0, res.options.uri.indexOf('?'));
	            const filename = url.substring(url.lastIndexOf('/') + 1);
	            fs.createWriteStream(filename).write(res.body);
	        }
	        done();
	    }
    });
    
    try {  
	    var text = fs.readFileSync('urls.txt', 'utf8').toString();
	    var links = text.split(",");
	    links = links.map(function(l) {
	        return l + "?x-oss-process=image/resize,h_500/quality,q_10";
	    });

	    console.log("\n\n" + links.length + " images to download..." + "\n");
	    c.queue(links);
	}
	catch(e) {
		console.log('Error:', e.stack);
    }

Things to mention:

- Reduced image quality to download faster by adding this query string: `?x-oss-process=image/resize,h_500/quality,q_10`

- It was a good try but it did not work enough because the previous script had to be run first to fetch all image URLs and then this downloader would do the job.

### 2. Downloading images simultaneously with crawling of each product:

As mentioned above, I had to wait a long time for the links to be received. So I solved this problem, at the same time I was looking at the downloaded images and the script was crawling a new product.

I just added this line instead of saving image URLs of the product to a file in first script:

    if (images.length > 0) {
	    const links = [images[images.length-1]].map(function(l) {
		    return l.substring(0, l.indexOf('?')) + "?x-oss-process=image/resize,h_500/quality,q_10";
	     });
	     console.log(links);
	     download(links, dest)
	     .then(result => {
		    console.log(result);   
	    })
	    .catch(error => console.log("downloaded error", error))
    }



# Conclusion

This was a really time to have fun and also test my basic knowledge in web development!
The codes were not written very clean and standard due to lack of competition time.

Here are some solutions I thought about later but did not code:

 - Instead of downloading the images, take the product list once and
   save the hash of all the image URLs once before the start of the next
   round of the contest. Repeat the same thing after the start of the
   new round, but this time look for a different hash, if it is found,
   it is probably the image with the discount code.
   
 - I think the discount code was placed in the last photo so that if
   someone working in the browser could not easily find it, so instead
   of downloading all the images, which are too many, just save the last
   one.

> I didn't win anything but enjoying my time for just a couple of hours!
