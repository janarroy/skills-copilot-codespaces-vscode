// Create web server
// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var qs = require('querystring');
var comments = [];

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url);
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    var method = request.method;

    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                response.writeHead(404, {"Content-Type": "text/html"});
                response.end("404 Not Found");
            } else {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.end(data);
            }
        });
    } else if (pathname === '/comment') {
        if (method === 'POST') {
            var postData = '';
            request.setEncoding('utf8');
            request.addListener('data', function (postDataChunk) {
                postData += postDataChunk;
            });
            request.addListener('end', function () {
                var comment = qs.parse(postData);
                comment.time = new Date();
                comments.push(comment);
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.end(JSON.stringify(comments));
            });
        } else {
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.end(JSON.stringify(comments));
        }
    } else {
        var filePath = path.join(__dirname, pathname);
        fs.exists(filePath, function (exists) {
            if (!exists) {
                response.writeHead(404, {"Content-Type": "text/html"});
                response.end("404 Not Found");
            } else {
                fs.readFile(filePath, function (err, data) {
                    if (err) {
                        response.writeHead(500, {"Content-Type": "text/html"});
                        response.end("500 Server Error");
                    } else {
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.end(data);
                    }
                });
            }
        });
    }
});

// Listen on port 8000, IP defaults to