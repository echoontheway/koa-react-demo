require('babel-register'); 
const app = require('./server/app');
const server = app.listen(3000);
const WebSocket = require('ws');
const enableWss = require('./server/wsServer');
enableWss(new WebSocket.Server({server}));


console.log('app started at port 3000')