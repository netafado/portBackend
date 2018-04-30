const express   = require('express');
const db        = require('mongoose');
db.Promise      = global.Promise;

db.connect(process.env._DB_HOST);

module.exports = db;