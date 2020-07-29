const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

const users = require('./public/users.json')

app.get(
  '/',
  (request, response) => {
    response.send("Hello world")
  }
)

app.get(
  '/users',
  (request, response) => {
    //response.sendFile('users.json', {root: path.join(__dirname, 'public')})
    response.send(users)
  }
)

app.put(
  '/users',
  (request, response) => {
    response.send("Received a PUT request at /users\n")
    console.log(`Put request`)
  }
)


app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))