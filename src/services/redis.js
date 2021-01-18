'use strict';

const redis = require("redis");
const client = redis.createClient({
    host:"127.0.0.1",
    port:6379,
})

let instance = class {

    get(key){
        return client.set(key, (err, result) => {
            return result;
        });        
    }

    set(key, value){
        client.set(key, value);
    }


}

module.exports = instance;