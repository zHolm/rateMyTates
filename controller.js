
const models = require('./models');

module.exports = {
	home: (req, res)=>{
		models.Potato.find({}, (err, potatoes)=>{
			if(err){console.log('can\'t find potatoes'); res.json({message: "Error", error: err})}
			else{
				res.json({message: "Success", data: potatoes})

			}
		})
	},
	add: (req, res)=>{
		let potato = new models.Potato(req.body);
		console.log("hittng add route");
		potato.save((err)=>{
			if(err){console.log('not saved'); res.json({message:"Error", error: err})}
			else{
				console.log('task saved to database');
				res.json({message: "Success", data: potato})
			}
		})
	},
	remove : (req, res)=>{
		models.Potato.remove({_id: req.params.id}, (err, data)=>{
			if(err){
				console.log("still here");
				res.json({message: "Error", error: err});
			} else {
				console.log("good-bye", req.params.id);	
				res.json({message: "good", data:data})
			}
		})
	},
	farm: (req, res)=>{
		console.log("asd", req.params.name)
		models.Potato.find({farmer: req.params.name}, (err,potatoes)=>{
			if(err){
				console.log("error finding thier potatoes", err)
				res.json({message:"Error", error:err})
			} else {
				console.log("found ", req.params.farmer, "\'s Potatoes");
				res.json({message:"Potates!", potatoes: potatoes})
			}
		})
	},
	potato: (req,res)=>{
		models.Potato.find({_id: req.params.id}, (err, potato)=>{
			if(err){
				console.log("can't find task");
				res.json({message: "Error", error:err})
			} else {
				console.log("Found it")
				res.json({message: "Success", data: potato})
			}
		})
	},
	update : (req,res)=>{
		models.Potato.update({_id: req.params.id}, {$set: req.body}, (err, data)=>{
			if(err){
				console.log('not updated');
				res.json({message: "Error", error:err})
			}else{
				console.log('updated');
				res.json({message: "yes", data:data})
			}
	
		})
	},

	make_comment : (req, res)=>{
		var comment = new models.Comment(req.body);
		var rating;
		console.log("Potato id is " +req.params.id)
		comment.save((err)=>{
			if(err){
				console.log("well shit")
				res.json({message: "Error", error:err})
			} else{
				//console.log("the comment is: ", comment);
				//console.log("RATING: ", comment.rating);
				models.Potato.findOne({_id: req.params.id},(err, data)=>{
					//console.log("hye", data)
					let sumR = 0;
					let len = data.comments.length;
					for(var i=0; i<len;i++){
						sumR += data.comments[i].rating;
					}
					rating=(sumR+comment.rating)/(len+1);
					data.rating=Math.round(rating*10)/10;
					console.log("RATEDDDD: ?", data.rating)
					data.save(err=>{
						if(err) console.log(err, "rating not saved")
					});
				});
				models.Potato.findOneAndUpdate({_id: req.params.id}, {$push: {comments: comment}}, (err, data)=>{
					if(err){
				//		console.log("didnt update")
						res.json({message: "Error", error:err})
					}else{
						console.log("comment added")
						models.Potato.findOne({_id: req.params.id}, (err,data)=>{
				//			console.log("this potatoe", data);
						});
						res.json({message:"you like my tates?", data:data});
					}
				}
				)}
		})
	}
}
