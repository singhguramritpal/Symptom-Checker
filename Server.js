var https = require('https');
var express = require('express');
var app = express();
var fs=require('fs')
var MongoClient = require('mongodb').MongoClient;
var map; 

var obj;

fs.readFile('json/male.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj =data;
});
app.use(express.static(__dirname + '/'));
app.get("/male",function(request,response){
	response.setHeader("access-control-allow-origin","*");
	response.send(obj)
});

	
	
app.get('/data/:part', function (req, res) {

	//console.log("Inside")
	var part = req.params.part;
	console.log("not cached");

	MongoClient.connect("mongodb://admin:admin@ds059694.mongolab.com:59694/pixelsdb", function(err, db) {
	  	if(!err) {
	    	console.log("We are connected");
	  	}else{
	  		console.log("Problem in connection to mongodb");
	  	}
	  	var collection = db.collection('symptoms1');
	  	var items;
	  	collection.find().toArray(function(err, items) {
	  		for(var key in items[0]){
	  			map[key]=items[0][key];
	  		}
	  		var response = map[part];

			//coverting object into json format
	  		res.setHeader("Content-type","application/x-www-form-urlencoded");
    		res.setHeader("Access-Control-Allow-Origin","*");	
			res.send(JSON.stringify(response));
		});
	});
});

var port = Number(process.env.PORT || 3026)

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  map = new Map();
  console.log('Server listening at http://%s:%s', host, port);
});