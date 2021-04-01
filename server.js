const {response, request} = require('express');
const express = require('express');
const mc = require("mongodb").MongoClient;
let db;

let app = express();


app.use(express.static("public"));
app.use(express.json());

//when user presses mark, then save event

//add to database
//send ok response
app.post("/mark",function(req,res){
  console.log(req.method);
	console.log(req.url);
	console.log(req.path);
	console.log("Body:");
	console.log(req.body);
	console.log(req.body.name);
  //let temp = JSON.parse(req.body);
  /*
  db.collection("sessions").insertMany(temp,function(err, result){
    if(err) throw err;

    console.log(result);
    res.status(200);
    
  });
  */
  res.status(200);
  res.send();
});

app.get("/",function(req,res){
  //send log info to client

  //access info from database
})



mc.connect("mongodb://localhost:27017/", function(err, client) {
	if(err) throw err;
	console.log("Connected to database.");
  let db = client.db("timeTracker");
	//in here, you can select a database and start querying
  app.listen(8080);
  console.log("Server listening at http://localhost:8080");
});
