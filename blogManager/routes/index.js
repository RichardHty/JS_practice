var express           = require("express"),
    router            = express.Router(),
    passport          = require("passport");


//routes
router.get("/",function(req,res){
  res.redirect("/project");
});
router.get("/login",function(req,res){
  res.render("login");
});
router.post("/login",passport.authenticate("local",{
  successRedirect:"/project",
  failureRedirect: "/login"
}),function(req,res){
});

router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});

module.exports = router;