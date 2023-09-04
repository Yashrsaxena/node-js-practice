const http = require('http');

// SERVER
http.createServer((request, response) => {
    response.end("Hello From the SERVER!");
}).listen(8080, () => {
    console.log("Listening to server on port 8080");
});