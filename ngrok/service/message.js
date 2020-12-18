const { WebClient } = require('@slack/web-api');

exports.messageBot = async (req, res, next) => {
    try {
        console.log("[messageBot]: start");

        const token = 'token'; 
        const web = new WebClient(token);

        let body = req.body;
        let event = body.event;

        if (event.text === "안녕") {
            console.log(`[messageBot]: 메시지 수신 channel:${event.channel}, user:${event.user}`);
            web.chat
              .postMessage({ channel: event.channel, text: "안녕하세요 😉" })
              .then((result) => {
                console.log("[messageBot]: Message sent: " + result.ts);
              });
              res.sendStatus(200);
        }
    } catch (err) {
        console.log("[messageBot]: "+err);
        res.sendStatus(500);
        throw Error(err);
    }
}
