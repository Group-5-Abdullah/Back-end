'ues strict';

const express = require('express');

const cors = require('cors');

const axios = require('axios');
const jsonData = require ('./data.json');



const pg = require('pg');

require('dotenv').config();

const server = express();

server.use(cors());

server.use(express.json());

const PORT = process.env.PORT || 3002;


let MusicAPIKye = process.env.musicAPIKye

const client = new pg.Client(process.env.DATABASE_URL);
///////////////////////////////////////////////////////// Routs /////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// Music Routs ///////////////////////////////////////////////////////////////////////////
//////////////////// Get from API Music Rout
server.get('/MusicAPI', getMusicFromAPIHandler);
//////////////////// Get From Data Base Music Rout
server.get('/Music', getMusicFromDataBaseHandler);
//////////////////// Post On Data Base Music Rout
server.post('/Music', postOnDataBaseMusicHandler);
//////////////////// Delete From Data Base Music Rout
server.delete('/Music/:id', deleteFromDataBaseMusicHandler);
////////////////////////////////////////////////////////gift routes//////////////////////////////////////////////////
////////////////get from API gift//////////////
server.get("/gifts", giftsAPIHandler);
/////////////////post to DataBase gift//////////
server.post("/gift", postGiftHandler);
///////////////get from DataBase gift////////////
server.get("/gift", getGiftsFromDBHandler);
///////////////delete from DataBase gift////////////
server.delete("/gift/:id", deleteFromDbHandler);

////////////////////////////////////////////////////////flowers routes//////////////////////////////////////////////////
////////////////get from data.jason//////////////
server.get("/flowerslist", flowersListHandler);
/////////////////post to DataBase flowerstable//////////
server.post("/flowerslist", postFlowersHandler);
///////////////get from DataBase flowerstable////////////
server.get("/flower", getFlowerDBHandler);
///////////////delete from DataBase gift////////////
server.delete("/flower/:id", deleteFlowerHandler);


server.get('/events',getEvent)
server.post('/events',addEvent)
server.put('/events/:id',updateEvent)
server.delete('/events/:id',deleteEvent)

server.use(errorHandler); // under all routs
///////////////////////////////////////////////////////// Music constructor /////////////////////////////////////////////////////////////////////
function Music(track_name, track_url, aritst_name) {
    
        this.track_name = track_name,
        this.track_url = track_url,
        this.aritst_name = aritst_name
}
/////////////////////////////////////////////////////////gift constructor////////////////////////////////////////////
function Gifts(gift_title, gift_image, gift_price) {
    this.gift_title = gift_title;
    this.gift_image = gift_image;
    this.gift_price = gift_price;
  }
    /////////////////////////////////////////////////////////flowersList constructor////////////////////////////////////////////
function Flowers(flower_title, flower_image) {
  this.flower_title = flower_title;
  this.flower_image = flower_image;
  
}








/////////////////////////////////////////////////////////// Handlers //////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////// Get Music From API Handler ////////////////////////////////////////////////////////////
function getMusicFromAPIHandler(req, res) {
    try {
        const musicURL = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=wedding&api_key=${MusicAPIKye}&format=json`

        axios.get(musicURL)
            .then((musicURLAxiosResult) => {
                // console.log(musicURLAxiosResult.data.tracks.track);
                let mapMusicRes = musicURLAxiosResult.data.tracks.track.map((element) => {
                    let newMusic = new Music(element.name, element.url, element.artist.name);
                    return newMusic
                })
                res.send(mapMusicRes);
            })
            .catch((error) => {
                res.status(500).send(error);
            })
    }
    catch (error) {
        errorHandler(error, req, res);
    }

}
/////////////////////////////////////////////////////////////// Get Music From Data Base Handler //////////////////////////////////////////////
function getMusicFromDataBaseHandler(req, res) {
    const name = req.query.val;
    const sql = `SELECT * FROM music WHERE user_email='${name}';`;
    // const sql = `SELECT id=$1, track_name=$2, track_url=$3, aritst_name=$4 FROM music WHERE user_email=${useremail} RETURNING * ;`
    //         let values = [req.body.id,req.body.track_name,req.body.track_url,req.body.aritst_name];
    client.query(sql)
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            errorHandler(err, req, res);
        })
}
/////////////////////////////////////////////////////////////// postOnDataBaseMusicHandler ////////////////////////////////////////////////////
function postOnDataBaseMusicHandler(req, res) {
    const Music = req.body;
    const name = req.query.val;
    const sql = `INSERT INTO music (user_email, track_name, track_url, aritst_name)
    VALUES('${Music.user_email}','${Music.track_name}' ,'${Music.track_url}' ,'${Music.aritst_name}') ;`

    client.query(sql)
        .then((data) => {
            const sql = `SELECT * FROM music WHERE user_email='${name}';`;
            client.query(sql)
                .then((data) => {
                    res.send(data.rows);
                })
                .catch((err) => {
                    errorHandler(err, req, res);
                })
        })
            .catch((err) => {
                errorHandler(err, req, res);
            })
}
/////////////////////////////////////////////////////////////// delete From Data Base Music Handler ///////////////////////////////////////////
function deleteFromDataBaseMusicHandler(req, res) {
    const id = req.params.id;
    const name = req.query.val;
    let sql = `DELETE FROM music WHERE id='${id}' RETURNING *`;
    client.query(sql)
    .then((data) => {
        const sql = `SELECT * FROM music WHERE user_email='${name}';`;
        client.query(sql)
            .then((data) => {
                res.send(data.rows);
            })
            .catch((err) => {
                errorHandler(err, req, res);
            })
    })
        .catch((err) => {
            errorHandler(err, req, res);
        })
} 
/////////////////////////////////////////////////////////gift Handlers///////////////////////////////////////////////
//////////get from API Handler gift////////////
function giftsAPIHandler(req, res) {
    const ServerUrl = `${process.env.ServerUrl}`;
    axios
      .get(ServerUrl)
      .then((response) => {
        let filtered = response.data.search_results.filter((item) => {
          if (item.price == undefined) {
            return false;
          } else {
            return true;
          }
        });
        let resultForm = filtered.map((item) => {
          let gift = new Gifts(item.title, item.image, item.price.raw);
          return gift;
        });
        res.send(resultForm);
      })
      .catch((err) => {
        errorHandler(err, req, res);
      });
  }
  /////////post to DataBasr Handler gift////////////////////
  function postGiftHandler(req, res) {
    const body = req.body;
    const sql = `INSERT INTO gifts (gift_title, gift_image, gift_price,user_email)
                   VALUES ($1,$2,$3,$4) RETURNING *;`;
    let values = [
      body.gift_title,
      body.gift_image,
      body.gift_price,
      body.user_email,
    ];
    client
      .query(sql, values)
      .then((data) => {
        const user_email = req.body.user_email;
        const sql = `SELECT * FROM gifts WHERE user_email=$1`;
        client.query(sql, [user_email])
          .then((response) => {
            console.log(response);
            res.send(response.rows);
          })
          .catch((err) => {
            errorHandler(err, req, res);
          });
      })
      .catch((err) => {
        errorHandler(err, req, res);
      });
  }
  ////////get from DataBase gift///////////////////////
  function getGiftsFromDBHandler(req, res) {
    const user_email = req.query.user_email;
    const sql = `SELECT * FROM gifts WHERE user_email=$1`;
    client
      .query(sql, [user_email])
      .then((response) => {
        console.log(response);
        res.send(response.rows);
      })
      .catch((err) => {
        errorHandler(err, req, res);
      });
  }
  ////// delete from DataBase gift/////////////////////
  function deleteFromDbHandler(req, res) {
      const id= req.params.id;
    const user_email = req.query.user_email;
    const sql = `DELETE FROM gifts WHERE id=$1`;
    client
      .query(sql, [id])
      .then((respones) => {
        const sql = `SELECT * FROM gifts WHERE user_email=$1`;
        client.query(sql, [user_email])
          .then((response) => {
            console.log(response);
            res.send(response.rows);
          })
          .catch((err) => {
            errorHandler(err, req, res);
          });
      })
      .catch((err) => {
        errorHandler(err, req, res);
      });
  }

// //////////////////////////////////////////////////  event information part /////////////////////////////////////

function addEvent(req,res){
  const data=req.body ;
  console.log(data)
  const sql=`INSERT INTO eventinfo (event, location,date,description) VALUES ($1,$2,$3,$4,$5) RETURNING *;`
  const values = [data.event, data.location, data.date ,data.description,data.user_email];
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
  
 
  const sql=`UPDATE eventinfo SET event= $1 , location= $2 , date=$3 , description= $4 ,user_email= $5 WHERE id=${event_id} ;`;
  const values = [data.event, data.location, data.date ,data.description,data.user_email];
    

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
 /////////////////////////////////////////////////////////flowers Handlers///////////////////////////////////////////////
//////////get from data.jason Handler flowers////////////
function flowersListHandler(req, res) {
  res.status(200).send(jsonData.flowerslist);     
}

//////////post to dataBase flowers table ////////////
function postFlowersHandler(req, res) {
  const flower = req.body;
  // console.log(flower);
  const sql = `INSERT INTO flowers(flower_title,flower_image,user_email) VALUES($1, $2, $3) RETURNING *;`;
  const values = [flower.name, flower.photo, flower.user_email];

  client.query(sql, values)
  .then((data) => {
    const user_email = req.body.user_email;
    const sql = `SELECT * FROM flowers WHERE user_email=$1`;
    client.query(sql, [user_email])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        errorHandler(err, req, res);
      });
  })
  .catch((err) => {
    errorHandler(err, req, res);
  });
}

////////get from DataBase flowerstable///////////////////////
function getFlowerDBHandler(req, res) {
const user_email = req.query.user_email;
const sql = `SELECT * FROM flowers WHERE user_email=$1`;
client
  .query(sql, [user_email])
  .then((response) => {
    res.send(response.rows);
  })
  .catch((err) => {
    errorHandler(err, req, res);
  });
}

////// delete from DataBase flowerstable/////////////////////
function deleteFlowerHandler(req, res) {
const id= req.params.id;
  const user_email = req.query.user_email;
  const sql = `DELETE FROM flowers WHERE id=$1`;
  client
    .query(sql, [id])
    .then((respones) => {
      const sql = `SELECT * FROM flowers WHERE user_email=$1`;
      client.query(sql, [user_email])
        .then((response) => {
          console.log(response);
          res.send(response.rows);
        })
        .catch((err) => {
          errorHandler(err, req, res);
        });
    })
    .catch((err) => {
      errorHandler(err, req, res);
    });
}


/////////////////////////////////////////////////////////////// error Handler /////////////////////////////////////////////////////////////////
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
