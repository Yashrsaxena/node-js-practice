const fs = require('fs');
const http = require('http');
const url = require('url');

// SERVER
/* We will read data synchronously in this case as we want to read data only once, hence doing it outside the createServer callback function*/
const data = fs.readFileSync(`${__dirname}/../dev-data/data.json`, 'utf-8');
// const dataObj = JSON.parse(data);
http.createServer((request, response) => {
    pathName = request.url;
    if(pathName === '/' || pathName === '/overview'){
        response.end("This is an OVERVIEW!");
    }
    else if (pathName === '/product')
    {
        response.end('This is a PRODUCT!');
    }
    else if(pathName === '/api')
    {
        response.writeHead(200, {'Content-Type':'application/json'});
        response.end(data);
    }
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