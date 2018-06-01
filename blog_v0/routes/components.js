var express = require("express"),
    router  = express.Router({mergeParams:true}),
    bodyParser = require("body-parser"),
    path    = require("path");

router.use(bodyParser.urlencoded({extended:true}));


//components list index
router.get("/",function(req,res){
  res.render("components");
});

router.get("/:filepath/:filename",function(req,res){

  let reqPath = path.join(__dirname, '../');
  res.sendFile(path.join(reqPath+"/components/"+req.params.filepath+"/"+req.params.filename));
});

module.exports = router;