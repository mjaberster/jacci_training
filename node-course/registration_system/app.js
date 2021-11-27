const watcher = require('./file-system-watcher')
const fs = require('fs')
const parseAndValidate = require('./parseAndValidate')

watcherCallback = function (path) {
    console.log('${{path}} have been changed')
}
watcher(watcherCallback)

fs.readFile('student1.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    parseAndValidate(data)
})


fs.readFile('student2.json', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    parseAndValidate(data)
})