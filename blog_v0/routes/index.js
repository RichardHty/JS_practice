var express = require("express");
var router = express.Router();

//routes
router.get("/",function(req,res){
  res.redirect("/project");
});

module.exports = router;