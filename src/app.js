const { App } = require('@slack/bolt');
const slackService = require('./modules/slackService');
const config = require('../config/config.json');
const axios = require('axios');

// Initializes your app with your bot token and app token
const app = new App({
  token: config.token,
  signingSecret: config.signingSecret,
  socketMode: config.socketMode,
  appToken: config.appToken
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me"
          },
          "action_id": "button_click"
        }
      }
    ],
    text: `Hey there <@${message.user}>!`
  });
});

app.command('/covid19', async ({ body, ack, say }) => {
  try {
    await ack();
    const covidData = await axios.get(`http://localhost:3000/covid`);
    const covidInfo = covidData.data[0];
    const message = slackService.getBlockMessage(covidInfo)
    console.log(body)
    await say(message);
    
  } catch (error) {
    console.log(error)
  }
});

app.action('button_click', async ({ body, ack, say}) => {
  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

