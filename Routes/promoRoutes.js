const express = require("express");
const router = express.Router();

// Example data representing promotional events
const promoEvents = [
  {
    title: "Promo 1",
    startDate: "2023-10-15",
    endDate: "2023-10-18",
  },
  {
    title: "Promo 2",
    startDate: "2023-10-20",
    endDate: "2023-10-22",
  },
  // Add more promo events as needed
];

// Define the /promos route
router.get("/promos", (req, res) => {
  res.json(promoEvents);
});

module.exports = router;
