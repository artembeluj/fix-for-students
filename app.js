const express = require('express');
const cors = require('cors')
const http = require('http');
const logger = require('morgan');
require("dotenv").config();
const app = express();
const authRouter = require("./routes/api/auth");
const server = http.createServer(app);
const io = require('socket.io')(server);
const { onConnection } = require("./webSockets");

const { authenticate } = require("./middlewares");

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
io.use(authenticate);

app.use("/api/auth", authRouter);

io.on('connection', (socket) => {
  onConnection(io, socket);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message, });
});

module.exports = server;
