var through = require('through2');
var http = require('http');
var server = http.createServer(function(req, res) {
	req.pipe(through(uppercase)).pipe(res);
});
function uppercase(chunk, _, next) {
	this.push(String(chunk).toUpperCase());
	next();
}
server.listen(process.argv[2]);
