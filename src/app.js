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

// Slack command
app.command('/covid19', async ({ body, ack, say }) => {
  try {
    await ack('데이터를 취득중입니다.');
    const covidData = await axios.get(config.covidInfoUrl);
    const message = slackService.getBlockMessage(covidData.data[0])
    console.log(body)
    await say(message);
    
  } catch (error) {
    console.log(error)
    await say(`에러가 발생했습니다. 관리자에게 연락 해 주세요(Error Code: ${error.code})`);
  }
});
