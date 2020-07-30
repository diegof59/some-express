const express = require('express')
const uuid = require('uuid')

const router = express.Router()
let users = require('../../data')

router.get('/',
  (request, response) => {
    // For sending data in json file:
    //response.sendFile('users.json', {root: path.join(__dirname, 'public')})

    // response.send(users) Automatically sends as json
    console.log(`Users from api: ${JSON.stringify(users)}`)
    response.json(users)
  }
)

router.get('/:id',
  (request, response) => {

    const result = users.filter((user) => (user.id == request.params.id))

    if(result.length > 0){
      response.json(result)
    }
    else{
      response.status(400).json({msg: `User with id ${request.params.id} not found.`})
    }
  }
)

router.post('/',
  (request, response) => {
    if(request.body.name == undefined || request.body.age == undefined){
      response.status(400).json({msg: `A user field is not being send`})
      return
    }

    const newUser = {
      id: uuid.v4(),
      name: request.body.name,
      age: parseInt(request.body.age)
    }

    users.push(newUser)
    response.redirect('/')
  }
)

router.put('/:id',
  (request, response) => {
    if(request.body.name == undefined || request.body.age == undefined){
      response.status(400).json({msg: `A proper user is not being send`})
      return
    }

    let exists = false

    users = users.map((user) => {
      if(user.id == request.params.id){
        exists = true
        return {
          ...user,
          name: request.body.name ? request.body.name : user.name,
          age: request.body.age ? parseInt(request.body.age) : user.age
        }
      }
      return user
    })
    console.log(`Users from api put: ${JSON.stringify(users)}`)
    exists ?
      response.json(users)
    :
      response.status(400).json({msg: `User with id ${request.params.id} not found.`})
  }
)

router.delete('/:id',
  (request, response) => {

    let exists = false

    users = users.filter((user) => {
      if(user.id != request.params.id){
        return true
      }else{
        exists = true
        return false
      }
    })

    exists ?
      response.json(users)
    :
      response.status(400).json({msg: `User with id ${request.params.id} not found.`})
  }
)

module.exports = router