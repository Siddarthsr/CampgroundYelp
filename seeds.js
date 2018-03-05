var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name : "Cloud Rest",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/d9/bc/da/cougar-rock-campground.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
     {
        name : "Desert Nest",
        image: "https://www.reserveamerica.com/webphotos/NRSO/pid70243/0/540x360.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
     {
        name : "Rest Floor",
        image: "http://www.camping-together.com/images/Camping-Sites.jpg",
        description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
    
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
       if(err){
           console.log(err);
       }
       console.log("removed campgrounds!");
           // add a few campgrounds
           data.forEach(function(seed){
             Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added a compground");
                    //create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save(); 
                            console.log("Created new comment");
                        }
                        
                    });
                }   
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;
