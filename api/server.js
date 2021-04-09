const express = require('express');
const mw = require('../middleware/middleware');
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router');
const server = express();

server.use(express.json());
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send('<h2>Hello Server</h2>')
})

module.exports = server;
