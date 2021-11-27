const fs = require('fs');  //notes for the lecture: explain the require, show it doesn't work then show it works

fs.writeFileSync('notes.txt', 'This file was created by Node.js!');