'ues strict';

const express = require('express');

const cors = require('cors');


const pg = require('pg');

require('dotenv').config();

const server = express();

server.use(cors());

server.use(express.json());

const PORT = process.env.PORT || 3003;

const dataBaseControllers= require('./controllers/DataBaseControllers')
const dataJSONControllers = require('./controllers/dataJSONControllers')
const apiControllers = require('./controllers/APIControllers')

const errorHandler = require('./controllers/errorHandler')



const client = new pg.Client(process.env.DATABASE_URL);

///////////////////////////////////////////////////////// Routs /////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// Music Routs ///////////////////////////////////////////////////////////////////////////
//////////////////// Get from API Music Rout
server.get('/MusicAPI', apiControllers.getMusicFromAPIHandler);
//////////////////// Get From Data Base Music Rout
server.get('/Music', dataBaseControllers.getMusicFromDataBaseHandler);
//////////////////// Post On Data Base Music Rout
server.post('/Music', dataBaseControllers.postOnDataBaseMusicHandler);
//////////////////// Delete From Data Base Music Rout
server.delete('/Music/:id', dataBaseControllers.deleteFromDataBaseMusicHandler);
////////////////////////////////////////////////////////gift routes//////////////////////////////////////////////////
////////////////get from API gift//////////////
server.get("/gifts", apiControllers.giftsAPIHandler);
/////////////////post to DataBase gift//////////
server.post("/gift", dataBaseControllers.postGiftHandler);
///////////////get from DataBase gift////////////
server.get("/gift", dataBaseControllers.getGiftsFromDBHandler);
///////////////delete from DataBase gift////////////
server.delete("/gift/:id", dataBaseControllers.deleteFromDbHandler);

////////////////////////////////////////////////////////flowers routes//////////////////////////////////////////////////
////////////////get from data.jason//////////////
server.get("/flowerslist", dataJSONControllers.flowersListHandler);
/////////////////post to DataBase flowerstable//////////
server.post("/flowerslist", dataBaseControllers.postFlowersHandler);
///////////////get from DataBase flowerstable////////////
server.get("/flower", dataBaseControllers.getFlowerDBHandler);
///////////////delete from DataBase gift////////////
server.delete("/flower/:id", dataBaseControllers.deleteFlowerHandler);

/////////////////////////////////////////////////////// event routes ///////////////////////////////////////////////////
server.get('/events/:user_email',dataBaseControllers.getEvent)
server.post('/events',dataBaseControllers.addEvent)
server.put('/events/:id',dataBaseControllers.updateEvent)
server.delete('/events/:id',dataBaseControllers.deleteEvent)
////////////////////////////////////////////////////////food routes//////////////////////////////////////////////////
////////////////get from food api//////////////
server.get('/FoodAPI',apiControllers.getFoodFromAPIHandler);
///////////////get from table food////////////
server.get('/food', dataBaseControllers.getFoodFromDBHandler);
/////////////////post to table food//////////
server.post('/food', dataBaseControllers.postFoodFromDBHandler);
///////////////delete from table food////////////
server.delete('/food',dataBaseControllers.deleteFoodFromDBHandler)
//////////////////////////////////////////////////////// Ready Packages Routs //////////////////////////////////////////////////////////////////
/////////////////// Get From Ready Packages.json File
server.get("/readyPackegess", dataJSONControllers.getFromReadyPackagesFileHandler)
/////////////////// Get From Data Base Ready Packages
server.get("/readyPackeges", dataBaseControllers.getFromDataBaseReadyPackagesHandler)
/////////////////// post On Data Base Ready Packeges Handler
server.post('/readyPackeges', dataBaseControllers.postOnDataBaseReadyPackegesHandler);
/////////////////// Delete From Data Base Ready Pacakages
server.delete('/readyPackeges/:id', dataBaseControllers.deleteOnDataBaseReadyPackagesHandler);

server.use(errorHandler); // under all routs


 

client.connect()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Hi ${PORT}`)
        });
    })



