'use strict';

const redis = require("redis");
const client = redis.createClient({
    host:"127.0.0.1",
    port:6379,
})

let instance = class {

    get(key){
        return client.get(key, (err, result) => {
            return result;
        });        
    }
    set(key, value){
        client.set(key, value);
    }
    // 마지막 list에 추가
    rPush(key, value) {
        client.rpush(key, value); 
        // client.rpush(1, 2); 
    }
    //list 처음에 추가
    lPush(key, value) {
        client.lpush(key, value);
    }
    // start~end까지의 list검색
    lRange(key, start, end) {
        return client.lrange(key, start, end, (err, result) => {
            return result;
        });
    }

}

module.exports = instance;