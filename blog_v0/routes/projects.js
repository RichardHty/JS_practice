var express = require("express"),
    router  = express.Router(),
    markdown = require( "markdown-it")();
    Project = require("../models/project");
//projects list index
router.get("/",function(req,res){
  
  Project.find({}, function(err,projects){
  	if(err){
  		console.log(err);
  	}else{
      projects.forEach(function(project){
        project.description = markdown.render(project.description);
      });
  		res.render("dashboard",{allProjects:projects});
  	}
  });
});

module.exports = router;