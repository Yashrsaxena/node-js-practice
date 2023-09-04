const http = require('http');
const url = require('url');

// SERVER
http.createServer((request, response) => {
    pathName = request.url;
    if(pathName === '/' || pathName === '/overview'){
        response.end("This is an OVERVIEW!");
    }
    else if (pathName === '/product')
    {
        response.end('This is a PRODUCT!');
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