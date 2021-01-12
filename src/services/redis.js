'use strict';

const redis = require("redis");
const redisClient = redis.createClient({
    host:"127.0.0.1",
    port:6379,
    db:0,
    password:"baek"
})

let instance = class {
    constructor(key){
        this.key = key;
    }

    get(){

    }

    set(){

    }


}

module.exports = instance;