const express = require("express");
const ws = require("ws");
const { Pool } = require("pg");
require('dotenv').config()

const app = express();
const pool = new Pool({
    host: process.env.HST,
    user: 'postgres',
    max: 20,
    password: process.env.PSW
});
await pool.connect();
const PORT = 3005;

const wsServer = new ws.Server({noServer: true});
wsServer.on('connection', socket => {
    console.log("someone connected")
});

app.post("/init", async (req, res) => {
    /**
     * Backend handles the caching of unique ids.
     */
    const {siteID, ip} = req.body;
    const site = await pool.query('SELECT * from site_data WHERE site_id = $1::int', [siteID]);
    console.log(site)
    const result = await pool.query('UPDATE site_data SET real_views = $1')
    return res.send("hello")
})


const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request)
    })
});