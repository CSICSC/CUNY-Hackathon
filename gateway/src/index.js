const express = require("express");
const cors = require('cors');
const httpProxy = require('http-proxy')
const session = require('express-session');
require('dotenv').config();

const gateway = express();
const proxy = httpProxy.createProxyServer();

const servers = [
    { host: 'localhost', port: 3001 },
    { host: 'localhost', port: 3002 }
]

gateway.use(session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: true
}));

gateway.use(cors());
gateway.use((req, res) => {

    if (!req.session.currentServer) {
        req.session.currentServer = Math.floor(Math.random() * servers.length)
    }

    const targetServer = servers[req.session.currentServer];
    console.log(`LOG(proxy): routing to ${req.session.currentServer}`)

    proxy.web(req, res, {target: `http://${targetServer.host}:${targetServer.port}`});
})

const PORT = process.env.PORT || 80;

gateway.listen(PORT, () => console.log(`listening on port ${PORT}`))