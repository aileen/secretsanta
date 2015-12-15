var http = require('http');

http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello Aileen, it's working");
	res.end();
}).listen(8080);
