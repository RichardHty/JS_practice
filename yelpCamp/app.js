var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("assets"));

app.set("view engine","ejs");
var campgrounds = [
    {name:"ca", image:"https://pixabay.com/en/vw-camper-volkswagen-vw-car-automobile-b-336606/"},
    {name:"snow", image:"https://pixabay.com/en/ama-dablam-himalaya-mountain-peak-nepal--2064522/"}
  ];
app.get("/",function(req,res){
  res.render("landing");
});

app.get("/campgrounds",function(req,res){
  
  res.render("campgrounds",{campInfo:campgrounds});
});

app.post("/campgrounds",function(req,res){
  // var searchValue = 
  // var query = JSON.parse(req);
  // console.log(req);
  var name = req.body.name;
  var image = req.body.imageUrl;
  campgrounds.push({name:name,image:image});
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
	res.render("new");
});
app.listen(5000,process.env.IP,function(){
  console.log(process.env.IP);
  console.log("Server is listening");
});
