var zlib = require('zlib');
var tar = require('tar');
var crypto = require('crypto');
var concat = require('concat-stream')

var cipher = {
    name: process.argv[2],
    passphrase: process.argv[3]
};

process.stdin
    .pipe(crypto.createDecipher(cipher.name, cipher.passphrase))
    .pipe(zlib.createGunzip())
    .pipe(tar.Parse())
    .on('entry', function (entry) {
        if (entry.type == 'File') {
            entry.pipe(crypto.createHash('md5', {encoding: 'hex'}))
                .pipe(concat(function (hash) {
                    process.stdout.write(hash + ' ' + entry.path + '\n');
                }));
        }
    });


