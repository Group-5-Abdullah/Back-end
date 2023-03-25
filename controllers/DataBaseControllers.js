const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
require('dotenv').config();


// //////////////////////////////////////////////////  event information part /////////////////////////////////////

function addEvent(req,res){
    const data=req.body ;
   
    const sql=`INSERT INTO eventinfo (event, location,date,description,user_email) VALUES ($1,$2,$3,$4,$5) RETURNING *;`
    const values = [data.event, data.location, data.date ,data.description,data.user_email];
    client.query(sql,values)
    .then((data) => {
        res.send("your data was added !");
    })
        .catch(error => {
           
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
          errorHandler(err,req,res);
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
   let user_email= req.params.user_email
    const sql = `SELECT * FROM eventinfo WHERE user_email='${user_email}'`;
    client.query(sql)
    .then((data)=>{
        res.send(data.rows);
    })
    .catch((err)=>{
        errorHandler(err,req,res);
       
    })
  
  }
  //////////post to dataBase flowers table ////////////
  function postFlowersHandler(req, res) {
    const flower = req.body;
    
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
  //////////Get food From Data Base Handler////////
  
  function getFoodFromDBHandler(req, res) {
    const user_email = req.query.user_email;
    const sql = `SELECT * FROM food WHERE user_email=$1`;
    client
      .query(sql, [user_email])
      .then((response) => {
       
        res.send(response.rows);
      })
      .catch((err) => {
        errorHandler(err, req, res);
      });
    }
    
    /////////post to food table////////////////////
    
    function postFoodFromDBHandler (req, res) {
      const body = req.body;
      const sql = `INSERT INTO food (user_email, food_title, food_image) VALUES ($1, $2, $3) RETURNING *`;
      const values = [body.user_email, body.food_title, body.food_image];
    
      client.query(sql, values)
        .then((result) => {
          const sql = `SELECT * FROM food WHERE user_email = $1`;
          const values = [body.user_email];
    
          client.query(sql, values)
            .then((result) => {
              res.send(result.rows);
            })
            .catch((err) => {
              errorHandler(err, req, res);
            });
        })
        .catch((err) => {
          errorHandler(err, req, res);
        });
    }
    
    
    
    function deleteFoodFromDBHandler(req, res) {
      const id = req.query.id;
      const user_email = req.query.user_email;
      const sql = `DELETE FROM food WHERE id=$1 AND user_email=$2`;
      client.query(sql, [id, user_email])
        .then(() => {
          const sql = `SELECT * FROM food WHERE user_email=$1`;
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
  /////////////////////////////////////////////////////////////// Get Music From Data Base Handler //////////////////////////////////////////////
function getMusicFromDataBaseHandler(req, res) {
    const name = req.query.val;
    const sql = `SELECT * FROM music WHERE user_email='${name}';`;
   
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
 /////////////////////////////////////////////////////////////// post On Data Base Ready Packeges Handler //////////////////////////////////////
 function postOnDataBaseReadyPackegesHandler(req, res) {
    const readyPackeges = req.body;
    const name = req.body.user_email;
    const sql = `INSERT INTO readyPackages (user_email, gift_title, gift_image, gift_price, flower_image, flower_name, track_name, track_url, aritst_name, food_title, food_image)
    VALUES('${readyPackeges.user_email}','${readyPackeges.gift_title}' ,'${readyPackeges.gift_image}' ,'${readyPackeges.gift_price}' ,'${readyPackeges.flower_image}' ,'${readyPackeges.flower_name}' ,'${readyPackeges.track_name}' ,'${readyPackeges.track_url}' ,'${readyPackeges.aritst_name}' ,'${readyPackeges.food_title}' ,'${readyPackeges.food_image}') ;`
  
    client.query(sql)
        .then((data) => {
            const sql = `SELECT * FROM readyPackages WHERE user_email='${name}';`;
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
  /////////////////////////////////////////////////////////////// get From Data Base Ready Packages Handler /////////////////////////////////////
  function getFromDataBaseReadyPackagesHandler(req, res) {
    const name = req.query.val;
    const sql = `SELECT * FROM readyPackages WHERE user_email='${name}';`;
    client.query(sql)
        .then((data) => {
            res.send(data.rows);
        })
        .catch((err) => {
            errorHandler(err, req, res);
        })
  }
  /////////////////////////////////////////////////////////////// delete On Data Base Ready Packages Handler ////////////////////////////////////
  function deleteOnDataBaseReadyPackagesHandler(req, res) {
    const id = req.params.id;
    const name = req.query.val;
    let sql = `DELETE FROM readyPackages WHERE id='${id}' RETURNING *`;
    client.query(sql)
        .then((data) => {
            const sql = `SELECT * FROM readyPackages WHERE user_email='${name}';`;
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
  client.connect();
  module.exports = {addEvent,updateEvent,deleteEvent,getEvent,postFlowersHandler,getFlowerDBHandler,deleteFlowerHandler,getFoodFromDBHandler,postFoodFromDBHandler,deleteFoodFromDBHandler,postGiftHandler,getGiftsFromDBHandler,deleteFromDbHandler,getMusicFromDataBaseHandler,postOnDataBaseMusicHandler,deleteFromDataBaseMusicHandler,postOnDataBaseReadyPackegesHandler,getFromDataBaseReadyPackagesHandler,deleteOnDataBaseReadyPackagesHandler}