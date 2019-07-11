var express = require('express');

// App setup
var app = express();
var server = app.listen(3000, function () {
	console.log("You hear that????")
	console.log("The app is listening on port 3000")
})

// Static files
app.use(express.static('public'))