// Middleware example, a console logger
function logger(request, response, next){

  console.log(`Logger... Original Url: ${request.originalUrl}`)
  // Executes next middleware
  next()  
}

module.exports = logger