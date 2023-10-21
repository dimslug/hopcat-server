const Event = require("../models/eventModel");
const PermissionService = require("../middleware/authMiddleware");

class EventController {
  constructor(eventService, permissionService) {
    this.eventService = eventService;
    this.permissionService = permissionService;
  }

  //! Get all events
  async getAllEvents(req, res) {
    if (!(await this.permissionService.hasPermission(req.user, "view event"))) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const events = await this.eventService.getAllEvents();

    return res.json(events);
  }

  //! Get event by ID
  async getEventById(req, res) {
    if (!(await this.permissionService.hasPermission(req.user, "view event"))) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const event = await this.eventService.getEventById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.json(event);
  }

  //! Create event
  async createEvent(req, res) {
    if (
      !(await this.permissionService.hasPermission(req.user, "create event"))
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const event = await this.eventService.createEvent(req.body);

    //! Update the FullCalendar calendar with the new event
    calendar.addEvent(event);

    return res.json(event);
  }

  //! Update event
  async updateEvent(req, res) {
    if (
      !(await this.permissionService.hasPermission(req.user, "update event"))
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    const event = await this.eventService.updateEvent(req.params.id, req.body);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    //! Update the FullCalendar calendar with the updated event
    calendar.updateEvent(event);

    return res.json(event);
  }

  //! Delete event
  async deleteEvent(req, res) {
    if (
      !(await this.permissionService.hasPermission(req.user, "delete event"))
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await this.eventService.deleteEvent(req.params.id);

    //! Remove the event from the FullCalendar calendar
    calendar.removeEvent(req.params.id);

    return res.status(204).json();
  }
}

module.exports = EventController;
