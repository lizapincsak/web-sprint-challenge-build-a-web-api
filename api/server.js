const express = require('express');
const server = express();

const {logger} = require('./middleware/middlewares');
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json());
server.use(logger);

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Let's code!</h2>`);
  });

module.exports = server;
