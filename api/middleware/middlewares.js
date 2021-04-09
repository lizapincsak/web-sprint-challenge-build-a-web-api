const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

function logger(req, res, next) {
    const timestamp = new Date().toLocaleString()
    const method = req.method
    const url = req.originalUrl
    console.log(`[${timestamp}] ${method} to ${url}`)
    next()
  }

  module.exports = {
      logger
  }