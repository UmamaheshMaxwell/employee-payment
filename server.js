var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path")
var app = express();
var router = express.Router();
var morgan = require('morgan')

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// create "middleware" 
app.use(morgan('dev'))

router.get("/", function(req, res){
	res.json("Hello Bengaluru !!!")
})

router.get("/employee", function(req, res){

})

app.use("/", router);

var PORT = process.env.PORT || 3000

app.listen(PORT, function(){
	console.log("Server listening at port " + PORT);
});

