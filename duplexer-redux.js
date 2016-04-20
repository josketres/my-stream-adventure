var duplexer2 = require('duplexer2');
var stream = require('stream');

module.exports = function(counter) {
    var writable = new stream.Writable({objectMode:true});
    var counts = {};

    writable._write = function(country, _, next) {
        var c = counts[country.country];
        counts[country.country] = c ? c + 1 : 1; 
        return next();
    };

    writable.on('finish', function() {
        counter.setCounts(counts);
    });


    return duplexer2({objectMode : true}, writable, counter);
};
