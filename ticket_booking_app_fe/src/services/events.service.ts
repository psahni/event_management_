import axios from "axios"
import { API_URL } from "constants"

async function fetchEvents() {
  const events = await axios.get(`${API_URL}/api/events`)
  
  return events.data;
}

async function fetchEventById(id: string) {
  const event = await axios.get(`${API_URL}/api/events/${id}`)

  return event.data
}

let eventsService = {}
export default eventsService = {
  fetchEvents,
  fetchEventById
}