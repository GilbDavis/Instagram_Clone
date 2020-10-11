const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const config = require('./config/configuration');

app.use(cors());
app.use(express.json({ extended: true }));

server.listen(config.port, () => {
  console.log("Servidor iniciado en el puerto: ", config.port);
});