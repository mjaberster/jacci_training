const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../content')

app.use(express.static(publicDirectoryPath))

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})