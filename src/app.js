require("dotenv").config();
const { App } = require("@slack/bolt");
const { setMenu } = require("./services/menuService");
// Initializes your app with your bot token and app token
const app = new App({
  appToken: process.env.APP_TOKEN,
  socketMode: true,
  token: process.env.BOT_TOKEN,
  signingSecret: process.env.SIGNING_SECRET,
});
// process.env
(async () => {
  // Start your app
  await app.start();
  console.log("⚡️ Bolt app is running!");
})();

// There are two ways to respond to slash commands.
// The first way is to use say(), which accepts a string or JSON payload.
// The second is respond() which is a utility for the response_url.
// These are explained in more depth in the responding to actions section.

// 메뉴저장
// 두개까지만 저장 (key: slack id, value: )
app.command("/set", setMenu);

// 오늘의 메뉴 결정
app.command("/get", async ({ body, ack, say }) => {
  try {
    ack();

    await say("get");
  } catch (error) {
    console.log(error);
    await say(
      `에러가 발생했습니다. 관리자에게 연락하지 말고 고쳐주세요(Error Code: ${error.code})`
    );
  }
});

// 현재까지 등록한 리스트 출력
app.command("/list", async ({ body, ack, say }) => {
  try {
    ack();

    await say("list");
  } catch (error) {
    console.log(error);
    await say(
      `에러가 발생했습니다. 관리자에게 연락하지 말고 고쳐주세요(Error Code: ${error.code})`
    );
  }
});

// 본인만 본인것만 고칠수있음
app.command("/del", async ({ body, ack, say }) => {
  try {
    ack();

    await say("del");
  } catch (error) {
    console.log(error);
    await say(
      `에러가 발생했습니다. 관리자에게 연락하지 말고 고쳐주세요(Error Code: ${error.code})`
    );
  }
});
// 다른 사람도 고칠수있음
app.command("/sudo-del", async ({ body, ack, say }) => {
  try {
    ack();

    await say("sudo-del");
  } catch (error) {
    console.log(error);
    await say(
      `에러가 발생했습니다. 관리자에게 연락하지 말고 고쳐주세요(Error Code: ${error.code})`
    );
  }
});

// 전부삭제
app.command("/flushall", async ({ body, ack, say }) => {
  try {
    ack();

    await say("flushall");
  } catch (error) {
    console.log(error);
    await say(
      `에러가 발생했습니다. 관리자에게 연락하지 말고 고쳐주세요(Error Code: ${error.code})`
    );
  }
});
