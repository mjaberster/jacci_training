const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log("M1")
    next()
})

app.get('/about', (req, res) => {
    res.send("About")
})

app.get('/user/:id', (req, res) => {
    let userId = req.params.id
    res.send(`you request user with id ${userId}`)
})
app.listen(3000)