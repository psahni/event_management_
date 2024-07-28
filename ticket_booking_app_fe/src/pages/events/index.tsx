import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import eventsService from "@services/events.service"
import { Event } from "@types/event"

const Events = () => {
  const [events, setEvents] = useState([])
  let loading = false;

  async function fetchEvents() {
    if (loading) return
  
    loading = true;
    const data = await eventsService.fetchEvents();
    return data;
  }
  useEffect(() => {
    fetchEvents().then(
      (data) => {
        loading = false
        setEvents(data)
      }
    )
  }, [])

  return (
    <div>
      <h3>Listing Events</h3>
      {
        events && events.map(
          (ev: Event) => <div key={ev._id} className='flex events-list'><Link to={`/events/${ev._id}`}>{ev.name}</Link></div>
        )
      }
    </div>
  )
}

export {
  Events
}