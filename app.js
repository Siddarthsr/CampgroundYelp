var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStratergy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    User       = require("./models/user"),
    seedDB     = require("./seeds");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/yelp_camp_v6", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret : "Siddarth is the most handsome man you will ever meet",
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// user defined middleware - calls this function on every single route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
   res.render("landing"); 
});

// INDEX Route -  show all campgrounds
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
             res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE ROUTE - add new route to DB
app.post("/campgrounds", function(req, res){
    //get data from form 
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save that to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
             //redirect back to campgrounds page- default is the GET request
            res.redirect("/campgrounds");
        }
    });
    //campgrounds.push(newCampground);
});

// NEW ROUTE - show form to create new Campground
//send the data to the post route
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new"); 
});


//SHOW ROUTE - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided ID
    // findById is mongoose methods
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            // render show template with that campground
             res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ====================
// COMMENTS ROUTES
// ====================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   //connect new comment to campground
                   campground.comments.push(comment);
                   campground.save();
                   //redirect campground show page
                   res.redirect('/campgrounds/'+ campground._id);
               }
            });
        }
    });
});


// ===========
// AUTH ROUTES
// ===========

// SHOW REGISTER FORM
app.get("/register", function(req, res) {
   res.render("register"); 
});
// handle sign up logic
app.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           return res.render("register");
       }
       passport.authenticate("local")(req, res, function(){
          res.redirect("/campgrounds"); 
       });
   });
});

//show login form
app.get("/login", function(req, res) {
  res.render("login");  
});
// handling login logic
//app.post("/login", middleware, callback);
app.post("/login", passport.authenticate("local", 
         {
             successRedirect: "/campgrounds",
             failureRedirect: "/login"
         }), function(req, res) {
});

// logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

//middleware to check if the user is logged in 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started!!");
});