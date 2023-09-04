const fs = require('fs');
const http = require('http');
const url = require('url');

// SERVER
/* We will read data synchronously in this case as we want to read data only once, hence doing it outside the createServer callback function*/
const replaceTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
    if(!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
return output;
} 
const tempOverview = fs.readFileSync(`${__dirname}/../templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/../templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/../templates/template-card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/../dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


http.createServer((request, response) => {
    const { query, pathname } = url.parse(request.url, true);

    // Overview Route (Home Page)
    if(pathname === '/' || pathname === '/overview'){
        response.writeHead(200, {'Content-Type':'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el));
        console.log(cardsHtml);
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        response.end(output);
    }

    // Product Route
    else if (pathname === '/product')
    {
        response.writeHead(200, {'content-type':'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        response.end(output);
    }

    // API Route
    else if(pathname === '/api')
    {
        response.writeHead(200, {'Content-Type':'application/json'});
        response.end(data);
    }

    // 404 - NOT FOUND
    else
    {
        response.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        response.end("<h1>PAGE NOT FOUND!</h1>");
    }
}).listen(8080, () => {
    console.log("Listening to server on port 8080");
});