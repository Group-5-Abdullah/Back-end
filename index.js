'ues strict';

const express = require('express');

const cors = require('cors');

const axios = require('axios');




const pg = require('pg');

require('dotenv').config();

const server = express();

server.use(cors());

server.use(express.json());

const PORT = 3002;
const DATABASE_URL = "postgres://nwdirbvq:CzOYZh18BS3hN9zRkIui1AgUegaiXhHy@manny.db.elephantsql.com/nwdirbvq"


const client = new pg.Client(DATABASE_URL);
///////////////////////////////////////////////////////// Routs /////////////////////////////////////////////////////////////////////////






server.use(errorHandler); // under all routs


/////////////////////////////////////////////////////////// Handlers //////////////////////////////////////////////////////////////////////////
function errorHandler(error, req, res) {
    const err = {
        status: 500,
        massage: error
    }
    res.status(500).send(err);
} // under all handlers

client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Hi ${PORT}`)
        });
    })
  