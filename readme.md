#YelpCamp

################## V1 ############################

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

#First step 
Each Campground has:
  * Name
  * Image

#Second Step
* Create our header and footer partials
* Add in Bootstrap

#Third Step
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Fourth Step
* Add a better header/title
* Make campgrounds display in a grid

#Fifth step
* Add a nav bar to all templates
* Style the new campground forms

################## V1 ############################

################## V2 ############################

#Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

#part 2
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

============= v3 ====================
#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

#Add a seeds file
* Add A seeds.js file
* Run the seeds file every time the server starts

#Add the comment model
* Make our errors go away!
* Display comments on Campground show page

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

The current routes are 

INDEX     /campgrounds
NEW       /campgrounds/new
CREATE    /campgrounds
SHOW      /campgrounds/:id

the new nested routes are - the comments are dependent on a campground

NEW     /campgrounds/:id/comments/new  - GET
CREATE  /campgrounds/:id/comments      - POST

=============== v5 ===============

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comments nicely

#Finish Styling Show Page
* Add public directory
* Add custom stylesheet

=============== v6 ====================

#Auth Part 1 - Add User Model
* Install all packages needed for auth
* Define User Model

#Auth Part 2 - Register
* Configure Passport
* Add register routes
* Add register template

#Auth Part 3 - Login
* Add login routes
* Add login template

#Auth Part 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

#Auth Part 5 - SHOW/Hide Links
* Show/hide auth links in navbar correctly