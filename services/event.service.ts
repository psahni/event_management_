// THIS SERVICE CONTAINS API CALLS TO BACKEND
import { Event } from "types/event"

async function createEvent(event: Event) {
    const data = await fetch('/api/events', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(event)
    })

    const newEvent = await data.json();
    return newEvent
}

async function updateEvent(event: Event, id: string) {
  const data = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(event)
  })

  const updatedEvent = await data.json();

  return updatedEvent
}

async function findEvent(id: string) {
  const data = await fetch(`/api/events/${id}`)
  const event = await data.json();

  return event
}

const eventService = {
  createEvent,
  updateEvent,
  findEvent,
}

export default eventService