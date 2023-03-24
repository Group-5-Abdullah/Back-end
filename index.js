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
const DATABASE_URL =process.env.DATABASE_URL //"postgresql://localhost:5432/demo"
console.log(DATABASE_URL)

const client = new pg.Client(DATABASE_URL);
///////////////////////////////////////////////////////// Routs /////////////////////////////////////////////////////////////////////////



server.get('/events',getEvent)
server.post('/events',addEvent)
server.put('/events/:id',updateEvent)
server.delete('/events/:id',deleteEvent)


server.use(errorHandler); // under all routs



function addEvent(req,res){
    const data=req.body ;
    console.log(data)
    const sql=`INSERT INTO eventinfo (event, location,date,description) VALUES ($1,$2,$3,$4) RETURNING *;`
    const values = [data.event, data.location, data.date ,data.description];
    client.query(sql,values)
    .then((data) => {
        res.send("your data was added !");
    })
        .catch(error => {
            // console.log(error);
            errorHandler(error, req, res);
        });

}

function updateEvent(req,res){

    const event_id=req.params.id ;
    const data=req.body ;
    
   
    const sql=`UPDATE eventinfo SET event= $1 , location= $2 , date=$3 , description= $4 WHERE id=${event_id} ;`;
    const values = [data.event, data.location, data.date ,data.description];
      

    client.query(sql,values)
        .then((data)=>{
             res.status(200).send(data.rows);
        })
        .catch((err)=>{
            console.log(err)
         })

}

function deleteEvent(req,res){
    const id=req.params.id ;
    const sql = `DELETE FROM eventinfo WHERE id=${id}`;
    client.query(sql)
    .then((data)=>{
        res.status(204).json({});
    })
    .catch((err)=>{
        errorHandler(err,req,res);
    })
}

function getEvent(req,res){
    const sql = `SELECT * FROM eventinfo`;
    client.query(sql)
    .then((data)=>{
        res.send(data.rows);
    })
    .catch((err)=>{
        errorHandler(err,req,res);
    })

}

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
  