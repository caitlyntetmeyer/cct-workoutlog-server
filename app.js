require('dotenv').config();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

sequelize.sync();

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));
app.use('/api/user', require('./routes/user')); // pre-mongo line
app.post('/api/products', function(req, res){
	var name = req.body.product.name;
	var description = req.body.product.description;
	var image = req.body.product.image;
	var price = req.body.product.price;

	Product.createProduct(name, description, image, price);
	res.send(200);
})

// login route:
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));
app.use('/api/test', function(req, res) {
	// When someone goes to localhost:3000/api/test...
	res.send("Hello World");
	// ...res.send takes the request and sends out above response to the DOM.
});

// Make the server start up when it is run on port 3000:
http.listen(process.env.PORT || 3000, function(){
	console.log("App is listening on port 3000.");
});
