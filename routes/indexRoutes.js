const express = require('express');

const routes = express.Router();

routes.use('/user',require('./userRoute'));

module.exports = routes;