// packages
var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

//db connection
mongoose.connect("mongodb://localhost/blog_manager");

//app config
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("resources"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");

//db entry schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: {
		type:String,
		default:"/img/leaves.jpeg"
	},
	body: String,
	tag: [],
	created: {
		type:Date, 
		default:Date.now
	},
	updated: {
		type:Date, 
		default:Date.now
	}

});
var projectSchema = new mongoose.Schema({
	title: String,
	image: {
		type:String,
		default:"/img/leaves.jpeg"
	},
	url: String,
	tag: [],
	description: String,
	created: {
		type:Date, 
		default:Date.now
	},
	updated: {
		type:Date, 
		default:Date.now
	}
});

// db collection object
var Blog = mongoose.model("Blog",blogSchema);
var Project = mongoose.model("Project",projectSchema);


//routes
app.get("/",function(req,res){
  res.redirect("/projects");
})
//projects list index
app.get("/projects",function(req,res){
  Project.find({}, function(err,projects){
  	if(err){
  		console.log(err);
  	}else{
  		res.render("dashboard",{allProjects:projects});
  	}
  });
});
//new project
app.get("/project/new",function(req,res){
  res.render("newProject");
});
app.post("/project/new",function(req,res){
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
  		res.redirect("/projects");
  	}
  });
});

//blogs list index
app.get("/blogs",function(req,res){
  Blog.find({}, function(err,blogs){
  	if(err){
  		console.log(err);
  	}else{
  		res.render("blogs",{allBlogs:blogs});
  	}
  });
});
//new post
app.get("/blog/new",function(req,res){
  res.render("newPost");
});
app.post("/blog/new",function(req,res){
  console.log(req.body.blog);
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
app.get("/blog/:id",function(req,res){
  Blog.findById(req.params.id, function(err,foundBlog){
  	if(err){
  		console.log(err);
  	}else{
  		if(foundBlog.image.startsWith("img/")){
  			foundBlog.image = "/"+foundBlog.image;
  		}
  		res.render("blog_detail",{blog:foundBlog});
  	}
  });
});
app.get("/blog/:id/edit",function(req,res){
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
app.put("/blog/:id",function(req,res){
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
app.delete("/blog/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
  	if(err){
  		console.log(err);
  	}else{
  		res.redirect("/blogs");
  	}
  });
})
app.listen(5040,process.env.IP,function(){
  console.log("server is listening");
});