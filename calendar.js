const FullCalendar = require("fullcalendar");
const express = require("express");
const app = express();

async function fetchPromos() {
  const response = await fetch("http://localhost:3000/promos/active");
  const promos = await response.json();
  return promos;
}

async function populateCalendarWithPromos(calendar) {
  const promos = await fetchPromos();
  for (const promo of promos) {
    const event = new FullCalendar.Event({
      title: promo.name,
      start: promo.startDate,
      end: promo.endDate,
    });

    calendar.addEvent(event);
  }
}

app.get("/calendar", async (req, res) => {
  const calendar = FullCalendar.create("#calendar", {
    firstDay: 5,
  });

  // Populate the calendar with promos from the server.
  await populateCalendarWithPromos(calendar);

  // Render the calendar to the DOM.
  calendar.render();

  // Send the response to the client.
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>My Calendar</title>
      </head>
      <body>
        <div id="calendar"></div>
      </body>
    </html>
  `);
});

module.exports = app;
