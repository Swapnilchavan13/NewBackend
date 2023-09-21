const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello New Backend")
})

app.get('/hello', (req, res) => {
    res.send("Is This working Fine")
})

app.get("/new", (req, res) => {
    res.send("hello This is new Backend")
})

app.get("/main", (req, res) => {
    res.send({
        "posts": [
          { "id": 1, "title": "This is Post One" },
          { "id": 2, "title": "This is Post Two" },
          { "id": 3, "title": "This is Post Three" }
        ],
        "comments": [
          { "id": 1, "body": "some comment", "postId": 1 },
          { "id": 2, "body": "Another comment", "postId": 2 }
        ],
        "profile": {
          "name": "Don`t type code"
        }
      })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})