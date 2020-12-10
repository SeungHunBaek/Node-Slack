const Slack = require('slack-node');

const webhookUri = "https://hooks.slack.com/services/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";

const slack = new Slack();
slack.setWebhook(webhookUri);
const send = async(message) => {
  slack.webhook({
    channel: "#develop", // 전송될 슬랙 채널
    username: "webhookbot", //슬랙에 표시될 이름
    text: message
  }, function(err, response) {
    console.log(response);
  });
}

send("abc");