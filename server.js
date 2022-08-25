const express = require("express");
const env = require('dotenv');
const {
    urlencoded
} = require('express');
const fs = require('fs');

const routs = require('./router/route');
const app = express();
const PORT = process.env.PORT || 4000;
env.config();
app.use(express.json())
app.use(urlencoded({
    extended: true
}))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
})
app.use(routs);
app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
})

