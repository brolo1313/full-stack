
function errorHandler(err,req, res, next) {
    if(err.name == 'UnauthorizedError'){
      return res.status(401).json({
          message: 'The user is not authorized',
          description: 'No authorization token was found'
        })
      }

    return res.status(500).json({message: err})
}

module.exports = errorHandler;