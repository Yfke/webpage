var express = require("express");
var app = express();
var mongoose = require("mongoose");

app.use('/styles/', express.static('public/css'));
app.use('/images/', express.static('public/images'));
app.use('/scripts/', express.static('public/scripts'));

// This line tells express to expect views to be .ejs files. 
app.set("view engine", "ejs");

// Connects to the 'content' database which will have different collections, such as 'publications', 'talks', 'teaching' etc. 
mongoose.connect("mongodb://localhost/content");

var publicationSchema = new mongoose.Schema({
	type: String, 
	title: String, 
	authors: String,
	publishedIn: String, 
	linkToArticle: String,
	linkToArXiv: String,
	doi: String, 
	abstract: String
});

var Publication = mongoose.model("Publication", publicationSchema);


// Root Route
app.get("/", function(req, res){
	res.render("index");
})


// Publications route, that first requests all publications from the database.
app.get("/publications", function(req, res){
	
	Publication.find({}, function(err, publications){
		if(err){
			console.log("There was an error when attempting to retrieve publications from the database.");
		} else{
			console.log("Publications succesfully extracted from database");
			res.render("publications", {publications: publications});
		}
	})
})
	
	

app.listen(process.env.PORT, process.env.IP, function(){
	console.log("server is running");
})

