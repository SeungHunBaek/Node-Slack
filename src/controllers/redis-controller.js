const redisService = require('../services/redis');

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

exports.commands = async(req, res, next)=>{
  let body = req.body;
  let event = body.event;
  let text = body.text;
    try {
      console.log("================");
      let commands = text.split("@");
      console.log("[commands]text:" +commands[0]);
      console.log("[commands]text:" +text);

      // commands종류에 따라서 분기
      switch(commands[0]){
        case "set":
          let set_key = commands[1];
          let value = commands[2];
          // let expire = commands[3];
          redisService.set(set_key,value);
          break;

        case "get":
            let get_key = commands[1];
            const keys = await redisService.get(get_key);
            keys.forEach( key => {
              console.log(key);
            });
          break;

        case "keys":
            let getKeys = commands[1];
            redisService.keys(getKeys);
          break;

        case "flushall":
            redisService.keys();
          break;
      }
      res.sendStatus(200);
    } catch (error) {
        console.log("[error]: " +error)
        res.status(500).json(err)
    }
}

exports.setData = async(req, res, next)=>{
  
  let body = req.body;
  let command = body.command;
  let text = body.text;
  try {

    redisService.set("lunchList",text)
    res.sendStatus(200);
  
  } catch (error) {
      console.log(error)
      res.status(500).json(error)
  }
}