var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


// SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String
});
var campground = mongoose.model("Campground", campgroundSchema);

campground.create( {name: "Some Camp Site", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
                function(err, campground){
                   if(err) {
                       console.log(err);
                   } else {
                       console.log("Successful adding");
                       console.log(campground);
                   }
                });

var campgrounds = [
    {name: "Some Camp Site", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
    {name: "More Camping", image:"https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"}
    ]

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //res.send("You hit the post route");
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server Started");
});
