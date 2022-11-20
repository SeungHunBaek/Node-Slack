// javascript에는 static변수가 없기때문에 closure로 구현
let menuInfo = (() => {
  let memuList = [];
  return (data) => {
    return data ? memuList.push(data) : memuList;
  };
})();

module.exports = {
  async setMenu({ body, ack, say, client }) {
    try {
      ack();
      console.log(JSON.stringify(body, null, 2));

      const res = await client.users.profile.get({
        user: body.user_id,
        token: process.env.BOT_TOKEN,
      });

      menuInfo({
        name: res.profile.real_name,
        menu: body.text,
      });

      console.log(menuInfo());

      await say(
        `${res.profile.real_name} 님이 ${body.text} 메뉴를 등록하셨습니다.`
      );
    } catch (error) {
      console.log(error);
      await say(
        `에러가 발생했습니다. 관리자에게 연락하지 말고 고쳐주세요(Error Code: ${error.code})`
      );
    }
  },
};
