var mongoose      = require("mongoose");
var projectSchema = new mongoose.Schema({
	title: String,
	image: {
		type:String,
		default:"/img/leaves.jpeg"
	},
	url: String,
	source_url: String,
	tag: String,
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

module.exports = mongoose.model("Project",projectSchema);