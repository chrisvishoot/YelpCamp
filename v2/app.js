var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
    
});
var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create( {name: "Some Camp Site", image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg", description:"This is a huge place!"},
//                     function(err, campground){
//                         if(err) {
//                             console.log(err);
//                         } else {
//                             console.log("NEW CAMPGROUND");
//                             console.log(campground);
//                         }
//                     });



app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allcampgrounds});
        }
    })
    
});


//Create a new campground
app.post("/campgrounds", function(req, res){
    //res.send("You hit the post route");
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name:name, image:image, description: description};
    //create a new campground and save it to the database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);     
        } else {
            res.redirect("/campgrounds");
        }
    });
    
});

app.get("/campgrounds/new", function(req, res){
   res.render("new"); 
});

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    //render show template with that campground
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            //render template that shows it.
            res.render("show", {campground: foundCampground}); 
        }
    })
    req.params.id
   
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Server Started");
});
