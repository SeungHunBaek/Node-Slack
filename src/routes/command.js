let express = require('express');
let router = express.Router();
const { WebClient } = require('@slack/web-api');
const token = 'token'; 
const web = new WebClient(token);
let redisController = require('../controllers/redis-controller');


router.post('/get', redisController.setData);

router.post('/set', redisController.setData);



module.exports = router;
