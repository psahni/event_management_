
import { Event } from "types/event"

async function createEvent(event: Event) {
    console.log("==> createEvent")
    const data = await fetch('/api/events', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(event)
    })

    const newEvent = await data.json();

    return newEvent
}

async function findEvent(id: string) {
  const data = await fetch(`/api/events/${id}`)
  const event = await data.json();

  return event
}

const eventService = {
  createEvent,
  findEvent
}

export default eventService