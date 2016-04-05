var through = require('through2');
var split = require('split');

process.stdin
    .pipe(split())
    .pipe(through(write, end))
    .pipe(process.stdout);

var odd = true;
function write(chunk, _, next) {
    if(odd) {
        this.push(chunk.toString().toLowerCase());
    } else {
        this.push(chunk.toString().toUpperCase());
    }
    odd = !odd;
    this.push('\n');
    next();
}

function end(done) { done(); }

