let eventService = require('../services/message');

exports.getEvent = async(req, res, next)=>{
    let body = req.body;
    let event = body.event;
    try {
        if (body.type === "event_callback") {
            console.log("getEvent()");
            // message타입의 이벤트인경우
            if (event.type === "message") {
              await eventService.messageBot(req, res, next);
            }
          // URL 검증처리
          } else if (body.type === "url_verification") {
            console.log("url verification");
            res.send(body.challenge);
          } else {
            res.sendStatus(200);
          }      
    } catch (error) {
        res.status(500).json(err)
    }
}