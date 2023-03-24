const errorHandler = require('./errorHandler')
const axios = require('axios');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
require('dotenv').config();
/////////////////////////////////////////////////////////// Get Music From API Handler ////////////////////////////////////////////////////////////
function getMusicFromAPIHandler(req, res) {
    
        const musicURL = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=wedding&api_key=${process.env.MusicAPIKye}&format=json`

        axios.get(musicURL)
            .then((musicURLAxiosResult) => {
                // console.log(musicURLAxiosResult.data.tracks.track);
                let mapMusicRes = musicURLAxiosResult.data.tracks.track.map((element) => {
                    let newMusic = new Music(element.name, element.url, element.artist.name);
                    return newMusic
                })
                res.send(mapMusicRes);
            })
            .catch((err) => {
                res.send(err);
                // console.error(err)
            })
    
  

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

module.exports = {getMusicFromAPIHandler,getMusicFromDataBaseHandler,postOnDataBaseMusicHandler,deleteFromDataBaseMusicHandler}