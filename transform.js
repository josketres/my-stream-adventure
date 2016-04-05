var through = require('through2');
process.stdin.pipe(through(write, end)).pipe(process.stdout);
function write(chunk, _, next) {
    this.push(chunk.toString().toUpperCase());
    next();
}
function end(done) {
    done();
}
