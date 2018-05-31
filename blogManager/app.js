// packages
var bodyParser        = require("body-parser"),
methodOverride        = require("method-override"),
mongoose              = require("mongoose"),
passport              = require("passport"),
localStrategy         = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose");
express               = require("express"),
app                   = express();

var projectRoutes = require("./routes/projects"),
    indexRoutes   = require("./routes/index"),
    blogRoutes    = require("./routes/blogs"),
    User          = require("./models/user");

//db connection
mongoose.connect("mongodb://localhost/blog_manager");

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//app config
app.use(require("express-session")({
  secret: "whatever",
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("resources"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});
app.use("/",indexRoutes);
app.use("/blog",blogRoutes);
app.use("/project",projectRoutes);


app.set("view engine","ejs");

app.listen(5040,process.env.IP,function(){
  console.log("server is listening");
});