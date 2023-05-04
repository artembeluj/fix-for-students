const mongoose = require("mongoose");

const server = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', false);

mongoose.connect(DB_HOST)
  .then(() => server.listen(PORT))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
