//! Dependencies
require("dotenv").config(); // connects our .env file to our complete project.
const express = require("express");
const cors = require('cors') // import cors middleware
const app = express();
const PORT = process.env.PORT || 4000; // points to our environment file and puts the value of PORT from that variable into this port variable.
const log = console.log;

//! IMPORTS
const { promoController, drinkController, creatorController } = require("./controllers");
const { db } = require('./db');

//! MIDDLEWARE
//* data handling
app.use(cors())
app.use(express.json());

//! ROUTES
app.use("/creator/", creatorController);
app.use("/drink", drinkController);
app.use("/promo", promoController);

//! Connection
const server = async() => {

    db();
    app.listen(PORT, () => log(`Hopspot Server running on Port: ${PORT}`) )

}

server();