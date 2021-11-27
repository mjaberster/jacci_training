const fs = require('fs');
// fs.writeFileSync('notes.txt', 'This is my first note!')
fs.appendFileSync('notes.txt', '\nthis is another line');

