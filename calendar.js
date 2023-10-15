const FullCalendar = require("fullcalendar");

app.get("/calendar", (req, res) => {
  //! Create a new calendar instance.
  const calendar = FullCalendar.create("#calendar", {
    firstDay: 5,
    events: [
      {
        title: "Event 1",
        start: new Date(2023, 9, 22, 10, 0, 0),
        end: new Date(2023, 9, 22, 11, 0, 0),
      },
    ],
  });

  //! Render the calendar to the DOM.
  calendar.render();

  //! Send the response to the client.
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
