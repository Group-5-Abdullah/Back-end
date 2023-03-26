require('dotenv').config();
const errorHandler = require('./errorHandler')
const axios = require('axios');

/////////////////////////////////////////////////////////food constructor////////////////////////////////////////////
function Food(food_title, food_image) {
    this.food_title = food_title;
    this.food_image = food_image;
   
  }

/////////////////////////////////////////////////////////// Get food From API ////////////////////////////////////////////////////////////

function getFoodFromAPIHandler(req, res) {
    const query = req.query.query; // query= meal ex lunch
    const apiURL =
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.foodAPIKey}&query=${query}&number=12`;
    axios
      .get(apiURL)
      .then((response) => {
        const results = response.data.results;
        const foodList = results.map(
          (result) => new Food(result.title, result.image)
        );
        res.send(foodList);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  }
  /////////////////////////////////////////////////////////gift constructor////////////////////////////////////////////
function Gifts(gift_title, gift_image, gift_price) {
    this.gift_title = gift_title;
    this.gift_image = gift_image;
    this.gift_price = gift_price;
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
    ///////////////////////////////////////////////////////// Music constructor /////////////////////////////////////////////////////////////////////
function Music(track_name, track_url, aritst_name) {
    
    this.track_name = track_name,
    this.track_url = track_url,
    this.aritst_name = aritst_name
}
/////////////////////////////////////////////////////////// Get Music From API Handler ////////////////////////////////////////////////////////////
function getMusicFromAPIHandler(req, res) {
    
        const musicURL = `http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=wedding&api_key=a413c7fc2ddf8bbbd7c3276e61a6e139&format=json`

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

  module.exports = {getFoodFromAPIHandler,giftsAPIHandler,getMusicFromAPIHandler}