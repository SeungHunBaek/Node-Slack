let express = require('express');
let router = express.Router();
const { WebClient } = require('@slack/web-api');
const token = 'token'; 
const web = new WebClient(token);
let eventService = require('../services/message');
let eventController = require('../controllers/events-controller');


router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});
// events 요청
router.post('/events', eventController.getEvent);



module.exports = router;
