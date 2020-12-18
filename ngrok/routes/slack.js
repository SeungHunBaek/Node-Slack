let express = require('express');
let router = express.Router();

const { WebClient } = require('@slack/web-api');
const token = 'token'; 

const web = new WebClient(token);

let eventService = require('../service/message');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});
// 
router.post('/events', (req, res, next) => {
    
    let body = req.body;
    let event = body.event;

    if (body.type === "event_callback") {
      if (event.type === "message") {
        eventService.messageBot(req, res, next);
  
      }
    } else if (body.type === "url_verification") {
      // URL 검증을 위한 처리
      console.log("url verification");
      res.send(body.challenge);
    } else {
      res.sendStatus(200);
    }
});

module.exports = router;
