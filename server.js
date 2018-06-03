const http = require('http');

//Use environment port, if not set use port 3000
const port = process.env.PORT || 3000;

const app = require('./app');

const server = http.createServer(app);

server.listen(port);

console.log('LISTENING IN PORT 3000');


