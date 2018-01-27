(function() {
	'use strict';

	var express = require('express');

	var app = express();

	app.use(express.static(__dirname + '/'));

	app.get('*', function(req, res) {
		res.sendFile(__dirname + '/single_page.html');
	});

	// start app ===============================================
	const PORT = process.env.PORT || 8080;
	app.listen(PORT, function() {
		console.log(`'... app listening on port ${PORT}'`);
	});
})();
