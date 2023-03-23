'ues strict';

const express = require('express');

const cors = require('cors');

const axios = require('axios');




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


server.use(errorHandler); // under all routs
///////////////////////////////////////////////////////// Music constructor /////////////////////////////////////////////////////////////////////
function Music(track_name, track_url, aritst_name) {
    
        this.track_name = track_name,
        this.track_url = track_url,
        this.aritst_name = aritst_name
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
