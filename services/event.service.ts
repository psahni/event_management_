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
  if (updatedEvent._id) return event

  return { _id: null }
}

async function deleteEvent(id: string) {
  const data = await fetch(`/api/events/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })

  const deletedData = data.json()

  return deletedData
}

async function findEvent(id: string) {
  const data = await fetch(`/api/events/${id}`)
  const event = await data.json();

  return event
}

const eventService = {
  createEvent,
  updateEvent,
  deleteEvent,
  findEvent,
}

export default eventService