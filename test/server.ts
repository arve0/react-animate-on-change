import { createServer, ServerRequest, ServerResponse } from 'http'
import { readFileSync, existsSync } from 'fs'
import { join, normalize } from 'path'

const mimeTypes: { [index:string]: string } = {
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'default': 'text/plain',
}

const webserver = createServer(sendFile)

function sendFile(request: ServerRequest, response: ServerResponse) {
    let path = request.url || ''
    let safePath = normalize(path).replace('^(\.\.[\/\\])+', '')
    if (safePath === '' || safePath === '/') {
        safePath = 'index.html'
    }
    let filename = join(__dirname, safePath)
    if (!existsSync(filename)) {
        console.log('404 - ' + request.method + ': ' + request.url)
        response.statusCode = 404
        response.end('File not found.')
    } else {
        console.log('200 - ' + request.method + ': ' + request.url)

        let headers = {
            'Content-Type': mimeTypes[filename.split('.').pop() || 'default']
        }
        response.writeHead(200, headers)
        response.end(readFileSync(filename))
    }
}

export function start(port = 8888) {
    return new Promise((resolve, reject) => {
        webserver.listen(port, (err: {}) => {
            if (err) { return reject(err) }
            console.log(`Listening on port ${port}`)
            resolve()
        })
    })
}

export function shutdown() {
    webserver.close()
}
