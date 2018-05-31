var Project = require("../models/project"),
    markdown = require("markdown-it")(),
    express = require("express"),
    router  = express.Router({mergeParams:true});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

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
//new project
router.get("/new",isLoggedIn,function(req,res){
  res.render("newProject");
});
router.post("/new",function(req,res){
  console.log(req.body.project);
  var newInfo = req.body.project;
  if(newInfo.image === ''){
  	delete newInfo.image;
  }
  console.log(newInfo);
  // res.redirect("/blogs");
  Project.create(newInfo,function(err,newProject){
  	if(err){
  		console.log(err);
  	}else{
  		res.redirect("/project");
  	}
  });
});

router.get("/:id/edit",isLoggedIn,function(req,res){
  Project.findById(req.params.id, function(err,foundProject){
    if(err){
      console.log(err);
    }else{
      if(foundProject.image.startsWith("img/")){
        foundProject.image = "/"+foundProject.image;
      }

      res.render("project_edit",{project:foundProject});
    }
  });
  
});

router.put("/:id",isLoggedIn,function(req,res){
  var updates = req.body.project;
  updates.updated = Date.now();
  Project.findByIdAndUpdate(req.params.id,updates,function(err,updatedProject){
    if(err){
      console.log(err);
    }else{
      res.redirect("/project");
    }
  });
  
});


router.delete("/:id",isLoggedIn,function(req,res){
  Project.findByIdAndRemove(req.params.id,function(err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/project");
    }
  });
})

module.exports = router;