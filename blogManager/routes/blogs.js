var Blog     = require("../models/blog"),
	markdown = require("markdown-it")(),
    express  = require("express"),
    router   = express.Router({mergeParams:true});


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

//blogs list index
router.get("/",function(req,res){
  Blog.find({}, function(err,blogs){
  	if(err){
  		console.log(err);
  	}else{
      blogs.forEach(function(blog){
        blog.body = markdown.render(blog.body.substring(0,100)+"...");
      })
  		res.render("blogs",{allBlogs:blogs});
  	}
  });
});
//new post
router.get("/new",isLoggedIn,function(req,res){
  res.render("newPost");
});
router.post("/new",function(req,res){
  var newInfo = req.body.blog;
  if(newInfo.image === ''){
  	delete newInfo.image;
  }
  console.log(newInfo);
  // res.redirect("/blogs");
  Blog.create(newInfo,function(err,newBlog){
  	if(err){
  		console.log(err);
  	}else{
  		res.redirect("/blogs");
  	}
  });
});
router.get("/:id",function(req,res){
  Blog.findById(req.params.id, function(err,foundBlog){
  	if(err){
  		console.log(err);
  	}else{
  		if(foundBlog.image.startsWith("img/")){
  			foundBlog.image = "/"+foundBlog.image;
  		}
      foundBlog.body = markdown.render(foundBlog.body);
  		res.render("blog_detail",{blog:foundBlog});
  	}
  });
});
router.get("/:id/edit",isLoggedIn,function(req,res){
  Blog.findById(req.params.id, function(err,foundBlog){
  	if(err){
  		console.log(err);
  	}else{
  		if(foundBlog.image.startsWith("img/")){
  			foundBlog.image = "/"+foundBlog.image;
  		}
  		res.render("blog_edit",{blog:foundBlog});
  	}
  });
  
});

//update
router.put("/:id",isLoggedIn,function(req,res){
  var updates = req.body.blog;
  updates.updated = Date.now();
  Blog.findByIdAndUpdate(req.params.id,updates,function(err,updatedBlog){
  	if(err){
  		console.log(err);
  	}else{
  		res.redirect("/blog/"+req.params.id);
  	}
  });
  
});

//delete
router.delete("/:id",isLoggedIn,function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
  	if(err){
  		console.log(err);
  	}else{
  		res.redirect("/blog");
  	}
  });
})


module.exports = router;