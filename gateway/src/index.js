const express = require("express");
const cors = require('cors');
const httpProxy = require('http-proxy')
require('dotenv').config();

const gateway = express();
const proxy = httpProxy.createProxyServer();

const servers = [
    { host: 'localhost', port: 3001 },
    { host: 'localhost', port: 3002 }
]

let currentServer = 0;

gateway.use(cors());
gateway.use((req, res) => {
    const targetServer = servers[currentServer];
    currentServer = (currentServer + 1)&servers.length
    console.log(`LOG(proxy): routing to ${currentServer}`)
    proxy.web(req, res, {target: `http://${targetServer.host}:${targetServer.port}`});
})

const PORT = process.env.PORT || 80;

gateway.listen(PORT, () => console.log(`listening on port ${PORT}`))