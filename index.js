const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const userModel = require("../backend1/users");
const localStrategy = require("passport-local");
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));

// mongoose.connect("mongodb://127.0.0.1:27017/project");
// app.post("/login",(req,res)=>
// {
//     const{email,password} = req.body;
//     HotelModel.findOne({email: email})
//     .then(user=>{
//         if(user){
//             if(user.password === password){
//                 res.json("success")
//             }else{
//                 res.json("password is incorrect")
//             }
//         }else{
//             res.json("no record exists")
//         }
//     })
// })
// app.post('/register',(req,res)=>{
// HotelModel.create(req.body)
// .then(Hotel=>res.json(Hotel))
// .catch(err=>res.json(err))
// })
// REGISTERING USER AND LOGIN ---------------------
app.post("/register", function (req, res) {
  var userdata = new userModel({
    email: req.body.email,
    name: req.body.name,
  });
  userModel
    .register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    });
});
// LOGIN USER
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {}
);
// LOGOUT
app.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});
// is LOggedIN middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
app.listen(5000, () => {
  console.log("server is running");
});
