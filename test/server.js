"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = require("fs");
const path_1 = require("path");
const mimeTypes = {
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'default': 'text/plain',
};
const webserver = http_1.createServer(sendFile);
function sendFile(request, response) {
    let path = request.url || '';
    let safePath = path_1.normalize(path).replace('^(\.\.[\/\\])+', '');
    if (safePath === '' || safePath === '/') {
        safePath = 'index.html';
    }
    let filename = path_1.join(__dirname, safePath);
    if (!fs_1.existsSync(filename)) {
        console.log('404 - ' + request.method + ': ' + request.url);
        response.statusCode = 404;
        response.end('File not found.');
    }
    else {
        console.log('200 - ' + request.method + ': ' + request.url);
        let headers = {
            'Content-Type': mimeTypes[filename.split('.').pop() || 'default']
        };
        response.writeHead(200, headers);
        response.end(fs_1.readFileSync(filename));
    }
}
function start(port = 8888) {
    return new Promise((resolve, reject) => {
        webserver.listen(port, (err) => {
            if (err) {
                return reject(err);
            }
            console.log(`Listening on port ${port}`);
            resolve();
        });
    });
}
exports.start = start;
function shutdown() {
    webserver.close();
}
exports.shutdown = shutdown;
