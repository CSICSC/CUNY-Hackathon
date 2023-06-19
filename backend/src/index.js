const express = require("express");
const ws = require("ws");
const { Pool } = require("pg");
const cors = require('cors')
const { v4: uuid } = require('uuid');
const {createClient} = require('redis');
const {subtractTimesInSeconds, sendFriendEmail, sendEmail } = require('./utilities')
const nodemailer = require('nodemailer')
require('dotenv').config();

const app = express();
const client1 = createClient();
const client2 = createClient();

/**
 * Configure discord
 */

client1.connect();
client2.connect();

const pool = new Pool({
    host: process.env.HST,
    user: 'postgres',
    max: 20,
    database: 'cuny_hackathon',
    password: process.env.PSW
});

(async () => {
    await pool.connect();
})()

app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 3005;

const wsServer = new ws.Server({noServer: true});
wsServer.on('connection', socket => {

    socket.on('message', async (data) => {
        const dat = JSON.parse(data.toString());

        const res = await client1.expire(dat.cookie, 6)
        socket.send(`${res}`)
    })
});

app.post("/init", async (req, res) => {
    /**
     * Backend handles the caching of unique ids.
     */
    const { siteID } = req.body;
    let site = await pool.query('SELECT * from site_data WHERE site_id = $1::int', [siteID]);
    site = site.rows[0];

    const ip = req.ip;
    const conn_id = uuid()

    let exists = await pool.query('SELECT * FROM connection WHERE ip_addr = $1::varchar', [ip]);
    const not_exists = !(exists.rows.length !== 0);

    let time = new Date();
    time = `${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}`
    await pool.query('INSERT INTO connection(conn_id, ip_addr, friend_emails, friend_discords, time_connected, site_id) VALUES ($1::varchar, $2::varchar, ARRAY[]::text[], ARRAY[]::text[], $3::time, $4::int)', [conn_id, ip, time, siteID])


    let location;

    if(process.env.CUR === "DEV"){
        location = "localhost";
    }else{
        try{
            let loc_res = await fetch(`http://ip-api.com/json/${ip}`)
            loc_res = await loc_res.json();
            location = `${loc_res.country}/${loc_res.regionName}`
        }catch(e){
            location = "error."
        }
    }


    await pool.query(`UPDATE site_data SET real_views = $2::int, unique_views = $3::int, real_location = ARRAY_APPEND(real_location, $4::text)${not_exists ? `, unique_location = ARRAY_APPEND(unique_location, $4::text)` : ''} WHERE site_id = $1::int`, [siteID, site.real_views + 1, not_exists ? site.unique_views + 1 : site.unique_views, location]);

    client1.set(conn_id, 1);
    client1.expire(conn_id, 6);

    console.log(`LOG: initial connection from ${conn_id} in ${location} with ip ${ip} on ${time} at the date ${new Date()}`);

    return res.send({conn_id});
});

app.post('/input', async (req, res) => {
    const { input, type, cookie } = req.body;

    if(type === 'email'){
        try{
            await pool.query('UPDATE connection SET email = $1::varchar WHERE conn_id = $2::varchar', [input, cookie]);
            sendEmail(input)
        }catch(e) {
            console.log(e);
        }
    }else {
        try{
            await pool.query('UPDATE connection SET discord = $1::varchar WHERE conn_id = $2::varchar', [input, cookie]);
        }catch(e) {
            console.log(e);
        }
    }

    console.log(`LOG: input of type ${type} received as ${input} from ${cookie}`);

    return res.send();
});

app.post('/friends', async (req, res) => {
    const { input, type, cookie } = req.body;

    if(type === 'email'){
        try{
            await pool.query('UPDATE connection SET friend_emails = ARRAY_APPEND(friend_emails, $1::text) WHERE conn_id = $2::varchar', [input, cookie]);
            sendFriendEmail(input);
        }catch(e) {
            console.log(e);
        }
    }else {
        try{
            await pool.query('UPDATE connection SET friend_discords = ARRAY_APPEND(friend_discords, $1::text) WHERE conn_id = $2::varchar', [input, cookie]);
        }catch(e) {
            console.log(e);
        }
    }

    console.log(`LOG: friend of type ${type} received as ${input} from ${cookie}`);

    return res.send();
})

client2.subscribe('__keyevent@0__:expired', async (message) => {
    let conn = await pool.query('SELECT time_connected FROM connection WHERE conn_id = $1::varchar', [message]);
    if(conn.rows.length === 0) {
        return;
    }


    const now = new Date();
    const time = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`

    const secondsResult = subtractTimesInSeconds(time,  conn.rows[0].time_connected);

    pool.query('UPDATE connection SET time_disconnected = $1::time WHERE conn_id = $2::varchar', [time, message]);
    pool.query('UPDATE site_data SET time_spent = ARRAY_APPEND(time_spent, $1::integer) WHERE site_id = $2::integer', [secondsResult, conn.rows[0].site_id])

    console.log(`LOG: connection ended with ${message} on ${time} and date ${now}`);
});

app.get('/health', (_, res) => {
    return res.status(200).send('ok');
})

const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))

server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request)
    })
});