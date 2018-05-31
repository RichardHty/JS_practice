// packages
var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
markdown       = require( "markdown-it" ),
hljs           = require('highlight.js'); // https://highlightjs.org/
mongoose       = require("mongoose"),
blogRoutes     = require("./routes/blogs"),
projectRoutes  = require("./routes/projects"),
indexRoutes    = require("./routes/index"),
express        = require("express");
app            = express();

mongoose.connect("mongodb://localhost/blog_manager");

//app config
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("resources"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");

app.use(indexRoutes);
app.use("/blog",blogRoutes);
app.use("/project",projectRoutes);


app.listen(5000,process.env.IP,function(){
  console.log("server is listening");
});