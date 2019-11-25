var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();
var connection = mysql.createConnection({
	hots: 		'localhost',
	user: 		'root',
	database: 	'join_us_db',
	password:	'password'
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(error, results) {
		if (error) throw error;
		var count = results[0].count;
		res.render("index", {count: count});
	});
});

app.post("/register", function(req, res) {
	var person = {email: req.body.email};
	connection.query("INSERT INTO users SET ?", person, function(error, result) {
		console.log(error);
		console.log(result);
		res.redirect("/");
	});
});

app.get("/joke", function(req, res) {
	var joke = "What do you call a dog that does a magic trick? A labracadabrador.";
	res.send(joke);
});

app.get("/random_num", function(req, res) {
	var num = Math.floor((Math.random() * 10) + 1);
	res.send("Your lucky number is: " + num);
});

app.listen(8080, function() {
	console.log("App listening on port 8080!");
});