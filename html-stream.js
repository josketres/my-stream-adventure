var trumpet = require('trumpet');
var through = require('through2');

var tr = trumpet();

tr.selectAll('.loud', function(elem) {
    var stream = elem.createStream();
    stream.pipe(through(function(chunk, _, next) {
        this.push(String(chunk).toUpperCase());
        next();
    }))
    .pipe(stream);
});

process.stdin.pipe(tr).pipe(process.stdout);
