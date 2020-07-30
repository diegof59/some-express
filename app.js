const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

let users = require('./data')

const app = express()
const PORT = process.env.PORT || 5000

const usersAPI = require('./routes/api/users')
const logger = require('./middleware/logger')

// Middleware used to populate request.body:
app.use(express.json()) // parsing application/json
app.use(express.urlencoded({ extended: true })) // parsing application/x-www-form-urlencoded

// Static provider
app.use(express.static(path.join(__dirname, 'public')))

// Handlebars(templates) middlerware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Use users router on /users
app.use('/api/users', usersAPI)
 
 // Middleware activation
//app.use(logger)


// Index route 
app.get(
  '/',
  (request, response) => {
    console.log(`Users from app: ${JSON.stringify(users)}`)
    response.render(
      'users',
      {
        title: 'Some Express | Users',
        users
      }
    )
  }
)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))