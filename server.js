const express = require('express');
const helmet = require('helmet');

const server = express();

const projectsRouter = require('./data/routers/projectsRouter');
const actionsRouter = require('./data/routers/actionsRouter');

server.use(helmet());
server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  res.send('server is running');
});

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

function logger(req, res, next) {
  const { method, originalUrl } = req;
  console.log({
    method,
    originalUrl,
    timestamp: new Date().toLocaleString()
  });
  next();
}
module.exports = server;
