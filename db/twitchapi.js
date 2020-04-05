var rp = require('request-promise');

const clientID = "m046u55atbrmg5sey3lq0002g2sam2";

function twitchCall (url, callback){
	var response;
	var error = null;
	var options = {
	    uri: url,
	    headers: {
	    	'Accept': 'application/vnd.twitchtv.v5+json',
	        'Client-ID': clientID
	    },
	    json: true // Automatically parses the JSON string in the response
	};
	 
	rp(options)
	    .then(function (resp) {
	    	response = resp;
	        callback(response, error);
	    })
	    .catch(function (err) {
	    	error = err;
	        callback(response, error);
	    });
}

module.exports = twitchCall;