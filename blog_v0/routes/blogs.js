var express  = require("express"),
    router   = express.Router(),
    markdown = require( "markdown-it")();
    Blog     = require("../models/blog");


//blogs list index
router.get("/",function(req,res){
  Blog.find({}, function(err,blogs){
  	if(err){
  		console.log(err);
  	}else{
      blogs.forEach(function(blog){
        blog.body = blog.body.substring(0,50) + "...";
        blog.body = markdown.render(blog.body);
      });
  		res.render("blogs",{allBlogs:blogs});
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

module.exports = router;