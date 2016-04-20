var counter = new require('stream').Readable({objectMode: true});
var through2 = require('through2');

counter._read = function(n) {
    this.push({country:'US'});
    this.push({country:'GB'});
    this.push({country:'AU'});
    this.push(null);
};

counter.setCounts = function(counts) {
    console.log('counts', counts);
};

var duplex = require('./duplexer-redux.js')(counter);

duplex.pipe(through2.obj(function(obj, _, next) {
    console.log('pass through', obj);
    this.push(obj);
    next();
})).pipe(duplex);
    
