const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} to ${url}`)
    next()
  }

  const validateActionId = async(req, res, next) =>{
      try{
        const action = await Actions.get(req.params.id)
        if(!action){
            next({status: 404, message: 'action not found'})
        } else{
            req.action = action
            next()
        }
      }
      catch(err){
          res.status(500).json(err.message)
      }
  }

  module.exports = {
      logger, validateActionId
  }