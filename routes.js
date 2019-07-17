
const controller = require("./controller");

module.exports = (app) =>{
	app.get('/potatoes', controller.home)
	app.get('/potatoes/:id/', controller.potato)
	app.post('/potatoes/', controller.add)
	app.put('/potatoes/:id/', controller.update)
	app.delete('/potatoes/:id', controller.remove)
	app.post('/potatoes/:id/comments', controller.make_comment)
	app.get('/farmers/:name', controller.farm)

}
