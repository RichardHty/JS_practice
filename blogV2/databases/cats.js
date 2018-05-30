var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

var nestedSchema = new mongoose.Schema({
  	content: String,
  	nested: []
});
// var catSchema = new mongoose.Schema({
//   name: String,
//   age : Number,
//   temperament: nestedSchema
// });

//this schema will not produce another id
// there will not be new id if there is no Object included
var catSchema = new mongoose.Schema({
  name: String,
  age : Number,
  temperament: {
  	content: String,
  	nested: []
  }
});
var Cat = mongoose.model("Cat", catSchema);
// var george = new Cat({
//   name:"George",
//   age:11,
//   temperament: [{
//   	content:"hello",
//   	nested: ['okay','good']
//   }]
// });
// george.save(function(err,cat){
//   if(err){
//   	console.log(err);
//   }else{
//   	console.log(cat);
//   }
// });
Cat.create({
  name:"George3",
  age:10,
  temperament: {
  	content:"hello",
  	nested: ['okay','good']
  }
},function(err,cat){
  if(err){
  	console.log(err);
  }else{
  	console.log(cat);
  }
});

Cat.find({},function(err,cats){
	if(err){
		console.log(err);
	}else{
		console.log(cats);
	}
});
