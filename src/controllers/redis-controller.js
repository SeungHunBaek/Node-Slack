// let eventService = require('../services/redis');

exports.getEvent = async(req, res, next)=>{
    let body = req.body;
    let event = body.event;
    try {
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(err)
    }
}

exports.setData = async(req, res, next)=>{
  let body = req.body;
  let command = body.command;
  try {
    console.log("================");
    console.log(command);
  
  } catch (error) {
      res.status(500).json(err)
  }
}