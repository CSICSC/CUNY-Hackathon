const express = require("express")
const ws = require("ws");

const app = express();
const PORT = 3005;

const wsServer = new ws.Server({noServer: true});
wsServer.on('connection', socket => {
    console.log("someone connected")
});



const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request)
    })
});