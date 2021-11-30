module.exports = {
    getBlockMessage(covidInfo){
        let message = {
            blocks: [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": `한국 코로나 감염정보 (기준일시: ${covidInfo.stdDay})`,
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": ">신규 확진자 수"
                        },
                        {
                            "type": "mrkdwn",
                            "text": `${this.numberWithCommas(covidInfo.incDec)}명`
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">누적 확진자 수"
                        },
                        {
                            "type": "mrkdwn",
                            "text": `${this.numberWithCommas(covidInfo.defCnt)}명`
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">사망자 수"
                        },
                        {
                            "type": "mrkdwn",
                            "text": `${this.numberWithCommas(covidInfo.deathCnt)}명`
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">해외유입 수"
                        },
                        {
                            "type": "mrkdwn",
                            "text": `${this.numberWithCommas(covidInfo.overFlowCnt)}명`
                        },
                        {
                            "type": "mrkdwn",
                            "text": ">데이터 갱신시간"
                        },
                        {
                            "type": "mrkdwn",
                            "text": `${covidInfo.createDt}`
                        }
                    ]
                }
            ],
            text: ` `
        };
        return message;
    },
    // ,처리
    numberWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};