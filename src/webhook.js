const Slack = require('slack-node');

// Channel:	#nodejs
// App:	#WebHook
const webhookUri = "https://hooks.slack.com/services/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";

const slack = new Slack();
slack.setWebhook(webhookUri);
const send = async(message) => {
  slack.webhook({
    channel: "#webhook", // 전송될 슬랙 채널
    username: "webhookbot", //슬랙에 표시될 이름
    text: message
  }, function(err, response) {
    console.log(response);
  });
}

send("test");