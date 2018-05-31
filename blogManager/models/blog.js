var mongoose      = require("mongoose");
var blogSchema = new mongoose.Schema({
	title: String,
	image: {
		type:String,
		default:"/img/leaves.jpeg"
	},
	body: String,
	tag: String,
	created: {
		type:Date, 
		default:Date.now
	},
	updated: {
		type:Date, 
		default:Date.now
	}

});


module.exports = mongoose.model("Blog",blogSchema);

