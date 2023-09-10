/* Develop Branch - Dominic Branch
 */

//! Imports
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const app = express();
const log = console.log;
const PORT = process.env.PORT
const { db } = require('./db');
const influencer = require('./controllers/influencer.controller');
const validateSession = require("./middleware/validate-session");


//! Middleware
app.use(express.json());


//! Routes

app.use('/influencer', influencer);



//! Connection
const server = async() => {
    db();

    app.listen(PORT, () => log(`Server running on ${PORT}`));
}

server();