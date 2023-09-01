/* Develop Branch - Dominic Branch
 */

//! Imports
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const log = console.log;
const PORT = process.env.PORT
const { db } = require('./db');


//! Middleware
app.use(express.json());


//! Routes

//! Connection
const server = async() => {
    db();

    app.listen(PORT, () => log(`Server running on ${PORT}`));
}

server();