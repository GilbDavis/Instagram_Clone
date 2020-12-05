const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const config = require('./config/configuration');
const logger = require('./utils/logger');
const morgan = require('morgan');

if (app.get('env') == "production") {
  app.use(morgan("combined", {
    "stream": logger.stream
  }));
} else {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json({ extended: true }));

app.use(config.api.prefix, require('./api/routes/index'));

app.use((error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }
  return response.status(Number(error.statusCode)).json({ status: error.status, message: error.message, errors: error.data });
});

server.listen(config.port, () => {
  console.log("Servidor iniciado en el puerto: ", config.port);
});