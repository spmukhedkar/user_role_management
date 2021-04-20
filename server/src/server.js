require('dotenv').config();
const express = require('express');
global.db = require('./lib/mongoose');
const path = require('path')
const bodyParser = require('body-parser')
const userRouter = require('./routes/user')
const roleRouter = require('./routes/role')

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
	res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Routers
app.use("/api/v2/users", userRouter);
app.use("/api/v2/roles", roleRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server Listening on ${process.env.APP_PORT}`);
});
