'use strict';

const redis = require("redis");
const client = redis.createClient({
    host:"127.0.0.1",
    port:6379,
})

client.on("error", (err) => {
    console.log("[Err] "+ err);
});
client.on("ready", () => {
    console.log("Redis is ready ");
});

const instance = class {
    set(slackId, token, expireTime){
        try {
            console.log("[redis.expire]start");
            console.log("[redis.set]slackId :" + slackId+", token: "+token);
            client.set(slackId, token);
            if(expireTime) {
                this.expire(slackId, expireTime);
            }    
        } catch (error) {
            throw(error);
        }
    };

    get(slackId){
        return new Promise((resolve, reject) => {
            try {
                client.get(slackId, (err, result) => {
                    if(err){
                        reject(resolve);
                    }
                    console.log("[redis.get]start");
                    console.log("[redis.get]slackId :" + slackId+", token: "+result);
                    resolve(result);
                });
            } catch (error) {
                throw(error)
            }
        });
    };
    
    expire(slackId, expireTime) {
        try {
            console.log("[redis.expire]start");
            console.log("[redis.expire]slackId :" + slackId+", expireTime: "+expireTime);
            client.expire(slackId, expireTime);
        } catch (error) {
            throw(error)
        }
    }

    exists(slackId){
        return new Promise((resolve, reject) => {
            client.exists(slackId, (err, result) => {
                if(err){
                    reject(resolve);
                }
                const isExists = result == "1"? true:false;
                resolve(isExists);
            });
        });
    };

    delete(key) {
        try {
            console.log("[redis.delete]start");
            console.log("[redis.delete]key :" + key);
            client.del(key);
        } catch (error) {
            throw(error)
        }
    }

    rename(originKey, rename) {
        console.log("[redis.rename]start");
        console.log("[redis.rename]originKey :" + originKey+", rename: "+rename);
        client.rename(originKey, rename);
    }

    async keys(keys) {
        // The * pattern returns an array of all keys
        return new Promise((resolve, reject)=>{
            client.keys(keys, function (err, arrayOfKeys) {
                console.log("[redis.keys]");
                const keysArr = [];
                arrayOfKeys.forEach( function (key) {
                    keysArr.push(key);
                });
                resolve(arrayOfKeys);
            });
        })

    }

    flushall(){
        client.flushall( function (didSucceed) {
            console.log("[redis.flushall]");
            console.log(didSucceed); 
        });
    }

    



}

module.exports = new instance();