import { useEffect, useState } from 'react';
import { Event } from "types/event"

export default function Events() {
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    
    async function fetchEvents() {
      const events = await fetch('/api/events');
      const data = await events.json();
    
      setEvents(data)
    }
    fetchEvents()
  }, [])


  return (
    <div>
      { events && events.map((ev: Event) => <div key={ev._id}>{ev.name}</div>)}
    </div>
  )
}

