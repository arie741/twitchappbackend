const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../db/postgresql');
const ta = require('../db/twitchapi');
const uuid = require('uuid');

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//router get
router.get('/', (req, res, next) => {
	res.json({data: "home"});
})

router.get('/getlinks', (req, res, next) => {
	db.query(db.getLinks, [], (error, response)=> {
		if (!error){
			res.status(200).json(response);
		} else {
			res.status(500).json({"status": "Internal Server Error", "error": error});
		}
	})
})

//router post

//Params required: 
//link - text
router.post('/linkinput', (req, res, next) => {
	db.query(db.insertLink, [uuid.v1(), req.body.link], (error, response)=>{
		if (!error){
			res.status(200).json({"status": "success"});
		} else {
			res.status(500).json({"status": "Internal Server Error", "error": error});
		}
	})
})


//Params required: 
//uuid - text
router.post('/linkdelete', (req, res, next) => {
	db.query(db.deleteLink, req.body.uuid, (error, response)=> {
		if (!error){
			res.status(200).json({"status": "success"});
		} else {
			res.status(500).json({"status": "Internal Server Error", "error": error});
		}
	})
})

//Params required: 
//inputtext - text
router.post('/searchchannel', (req, res, next) => {
	ta("https://api.twitch.tv/kraken/search/channels?query=" + req.body.inputtext + "&limit=10", (response, error) => {
		if (!error){
			res.status(200).json(response);
		} else if(req.body.inputtext === ""){
			res.status(200).json({"_total": 0, "channels": []});
		} else {
			res.status(500).json({"status": "Internal Server Error", "error": error});
		}
	})
})

module.exports = router;