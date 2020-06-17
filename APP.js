const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const url = "mongodb://localhost:27017/";

app.listen(8000, ()=>{ console.log("server started on port 8000"); });

app.set("views", path.join(__dirname, "views"));
app.set("public", path.join(__dirname, "public"));
app.set("images", path.join(__dirname, "images"));
app.set("node_modules", path.join(__dirname, "node_modules"));
// app.set("view engine", "pug");
app.use(express.static("views"));
app.use(express.static("public"));
app.use(express.static("images"));
app.use(express.static("node_modules"));

app.use(bodyParser.urlencoded({extended: false}));

app.get("/index", (req, res)=>{
	res.render("index");
});

app.get("/signup", (req, res)=>{
	res.render("signup");
});
// app.get("/thanks", (req, res)=>{
// 	res.render("thanks");
// });

app.post("/create-post", (req, res)=>{
	MongoClient.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, (err, conn)=>{
		if (err) throw err;

		var dbo = conn.db("Customers");
		dbo.collection('Contact Info').insertOne(req.body);
		res.redirect("/thanks");
	});
});
