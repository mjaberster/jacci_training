const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log("M1")
    next()
})

app.get('/about', (req, res) => {
    res.send("About")
})
app.listen(3000)