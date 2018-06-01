// packages
var bodyParser = require("body-parser"),
methodOverride = require("method-override"),
markdown       = require( "markdown-it" ),
mongoose       = require("mongoose"),
blogRoutes     = require("./routes/blogs"),
projectRoutes  = require("./routes/projects"),
indexRoutes    = require("./routes/index"),
componentRoutes= require("./routes/components"),
express        = require("express"),
app            = express();


mongoose.connect(process.env.DATABASEURL);

//app config
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("resources"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");

app.use(indexRoutes);
app.use("/blog",blogRoutes);
app.use("/project",projectRoutes);
app.use("/component",componentRoutes);


app.listen(process.env.PORT,process.env.IP,function(req,res,next){
  console.log("server is listening ");
});