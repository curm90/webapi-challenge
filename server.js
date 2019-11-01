const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  res.send('server is running');
});

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
