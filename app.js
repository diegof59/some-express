const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

const users = require('./routes/users')

// Middleware used to populate request.body:
// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get(
  '/',
  (request, response) => {
    response.send("Hello world")
  }
)

// Use users router on /users
app.use('/users', users)

// Middleware example, a console logger
function logger(request, response, next){

  console.log(`Logger... Original Url: ${request.originalUrl}`)
  // Executes next middleware
  next()  
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(logger) // Middleware activation

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))