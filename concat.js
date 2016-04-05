var concat = require('concat-stream');

process.stdin.pipe(concat(reverse));

function reverse(text) {
    process.stdout.write(text.toString().split('').reverse().join(''));
}

