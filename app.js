(function() {
    "use strict";

    var express = require('express');

    var app = express();
    var port = process.env.PORT || 8080; // set our port

    app.use(express.static(__dirname + '/'));

    app.get('/', function(req, res){
        res.sendfile(__dirname + '/index.html');
    });


    // start app ===============================================
    app.listen(port);   
    console.log('Connecting to server at port: ' + port);  

})();
