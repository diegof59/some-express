const express = require('express')

const app = express()
const PORT = process.ENV.PORT || 5000

app.get(
  '/',
  (request, response) => {
    response.send("Hello world")
  }
)

app.put(
  '/users',
  (request, response) => {
    response.send("Received a PUT request at /users\n")
    console.log(request)
  }
)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))