
import { Event } from "types/event"

function createEvent(event: Event) {
    console.log("==> createEvent")
    return {...event, ...{ id: 1}}
}

const eventService = {
  createEvent
}

export default eventService