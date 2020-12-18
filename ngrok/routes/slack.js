let express = require('express');
let router = express.Router();

const { WebClient } = require('@slack/web-api');
const token = 'xoxb-1584474769732-1575869421926-smTz7hia2DYv1wbg5SSoiEUF'; 
const web = new WebClient(token);

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});
// 
router.post('/events', (req, res, next) => {
    console.log("slack/events() Start:")
    let body = req.body;
    let event = body.event;

    if (body.type === "event_callback") {
      console.log(event);
      if (event.type === "message") {
        if (event.text === "안녕") {
          console.log(
            `메시지 수신 channel:${event.channel}, user:${event.user}`
          );
          web.chat
            .postMessage({ channel: event.channel, text: "안녕하세요 😉" })
            .then((result) => {
              console.log("Message sent: " + result.ts);
            });
          res.sendStatus(200);
        }
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
