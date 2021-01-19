const redisWrapper = require('../services/redis');
const redisService = new redisWrapper();

exports.getData = async(req, res, next)=>{
  let body = req.body;
  let command = body.command;
  let text = body.text;
    try {
      console.log("================get");
      res.sendStatus(200);
    } catch (error) {
        res.status(500).json(err)
    }
}

exports.setData = async(req, res, next)=>{
  
  let body = req.body;
  let command = body.command;
  let text = body.text;
  try {
    console.log("================");
    console.log("command: "+ command);
    console.log("text: "+ text);
    console.log("================");

    redisService.rPush("lunchList",text)
    

    
    res.sendStatus(200);
  
  } catch (error) {
      console.log(error)
      res.status(500).json(error)
  }
}