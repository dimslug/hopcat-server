//! Dependencies
require("dotenv").config(); // connects our .env file to our complete project.
const express = require("express");
const cors = require("cors"); // import cors middleware
const app = express();
const PORT = process.env.PORT || 4000; // points to our environment file and puts the value of PORT from that variable into this port variable.
const log = console.log;
const { db } = require("./db");
const influencer = require("./Controllers/influencer.controller");
const validateSession = require("./Middleware/validate-session");
const jwt = require("jsonwebtoken");
const calendar = require("./calendar.js");

//!
const promoController = require("./Controllers/promo.controller");
const drinkController = require("./Controllers/drink.controller");
const creatorController = require("./Controllers/creator.controller");
const notificationController = require("./Controllers/notificationController");
const eventController = require("./Controllers/eventcontroller");

//! IMPORTS

//! MIDDLEWARE
//* data handling
app.use(cors());
app.use(express.json());

//! ROUTES
app.use("/creator/", creatorController);
app.use("/drink", drinkController);
app.use("/promo", promoController);
app.use("/influencer", influencer);
app.use("/calendar", calendar);
app.use("/notifications", notificationController);

//! Connection


const server = async () => {
  db();
  app.listen(PORT, () => log(`Hopspot Server running on Port: ${PORT}`));
};

server();

