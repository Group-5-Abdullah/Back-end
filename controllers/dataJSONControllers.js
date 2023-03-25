

const jsonData = require ('../resorces/data.json');
const jsondata = require('../resorces/readyPackages.json');
  
 /////////////////////////////////////////////////////////flowers Handlers///////////////////////////////////////////////
//////////get from data.jason Handler flowers////////////
function flowersListHandler(req, res) {
    res.status(200).send(jsonData.flowerslist);     
  }
  /////////////////////////////////////////////////////////////// get From Ready Packages File Handler //////////////////////////////////////////
function getFromReadyPackagesFileHandler(req, res) {
  res.status(200).send(jsondata);
}

  

  // client.connect();
module.exports = {flowersListHandler,getFromReadyPackagesFileHandler}