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

app.get(
  '/users/:id',
  (request, response) => {
    // users.users. get users array from users json
    const result = users.users.filter((user) => (user.id === parseInt(request.params.id)))
    console.log(users,' ',result)
    if(result.length > 0){
      response.json(result)
    }
    else{
      response.status(400).json({msg: `User with id ${request.params.id} not found.`})
    }
  }
)

app.put(
  '/users',
  (request, response) => {
    response.send("Received a PUT request at /users\n")
    console.log(`Put request`)
  }
)

// Middleware example, a console logger
function logger(request, response, next){

  console.log(`Logger... Original Url: ${request.originalUrl}`)
  // Executes next middleware
  next()  
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(logger) // Middleware activation

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))