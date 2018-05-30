var express = require("express");
var app = express();


app.use(express.static("assets"));
app.set("view engine","ejs");

var projects = [
    {img:"img/leaves.jpeg", 
     caption:"Great leaves" , 
     github_link:"https://github.com/RichardHty/JS_practice/tree/master/patatap"
    },
    {img:"img/leaves.jpeg", 
     caption:"Great leaves" , 
     github_link:"https://github.com/RichardHty/JS_practice/tree/master/patatap"
    },
    {img:"img/leaves.jpeg", 
     caption:"Great leaves" , 
     github_link:"https://github.com/RichardHty/JS_practice/tree/master/patatap"
    },
    {img:"img/leaves.jpeg", 
     caption:"Great leaves" , 
     github_link:"https://github.com/RichardHty/JS_practice/tree/master/patatap"
    }
  ];
app.get("/",function(req,res){

	res.render("dashboard",{projects:projects});
});

app.listen(5000, process.env.IP, function(){
	console.log("server is listening!");
})