
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/potato_db');

const CommentSchema = new mongoose.Schema(
		{	
			comment_body: {type: String, required: true, maxLength: 90},
			rating: {type: Number, require:true, min: [1, "must be greater than 0"], 
				max: [5, "max rating 5"]},
		},
			{timestamps: true}
	);
const PotatoSchema = new mongoose.Schema(
		{	
			title: {type: String, required: true, maxLength: 90},
			rating: {type: Number, required: false},
			farmer: {type: String, required:true, maxLength:90},
			url: {type: String, required:true, minLength:10 },
			comments: [CommentSchema]
		},
			{timestamps: true}
	);

mongoose.model('Potato', PotatoSchema);
var Potato = mongoose.model('Potato')
mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

module.exports = {
	Potato: Potato,
	Comment: Comment
}
