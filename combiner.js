var combine = require('stream-combiner');
var split = require('split');
var through2 = require('through2');
var zlib = require('zlib');

module.exports = function() {
    return combine(split(), group(), zlib.createGzip());
};

function group() {
    var genre = null;
    var books = [];
    return through2({}, function(buffer, _, next) {
        if(buffer.length === 0) return next();

        var entry = JSON.parse(String(buffer));
        if (entry.type == 'book') {
            books.push(entry.name);
        } else {
            if(genre) {
            this.push(JSON.stringify({name : genre, books: books}) + '\n');
            }
            genre = entry.name;
            books = [];
        }
        next();
    }, function(cb) {
        this.push(JSON.stringify({name : genre, books: books}) + '\n');
        cb();
    });
}

