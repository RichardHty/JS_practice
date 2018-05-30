// packages
var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
	express    = require("express"),
	app        = express();

//db connection
mongoose.connect("mongodb://localhost/blog_manager");

//app config
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("assets"));
app.set("view engine","ejs");

//db entry schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: {
		type:String,
		default:"img/leaves.jpeg"
	},
	body: String,
	tag: [],
	created: {
		type:Date, 
		default:Date.now
	}

});
var projectSchema = new mongoose.Schema({
	title: String,
	image: {
		type:String,
		default:"img/leaves.jpeg"
	},
	url: String,
	tag: [],
	created: {
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
  		res.render("dashboard",{projects:projects});
  	}
  });
});

//blogs list index
app.get("/blogs",function(req,res){
  Blog.find({}, function(err,blogs){
  	if(err){
  		console.log(err);
  	}else{
  		res.render("blog_list",{allBlogs:blogs});
  	}
  });
});
app.get("/blog/:id",function(req,res){
  Blog.findById(req.params.id, function(err,foundBlog){
  	if(err){
  		console.log(err);
  	}else{
  		res.render("blog_detail",{blog:foundBlog});
  	}
  });
});
app.listen(5000, process.env.IP, function(){
	console.log("server is listening!");
})