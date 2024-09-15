import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Event } from "types/event"
import eventService from "services/event.service"

export default function Events() {
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const events = await fetch('/api/admin/events');
    const data = await events.json();
  
    setEvents(data)
  }

  function deleteEvent(event: Event) {
    if (event._id) {
      eventService.deleteEvent(event._id)
    }

    const updatedEvents = events.filter((ev: Event) => ev._id != event._id)
    setEvents(updatedEvents)
  }

  function publishEvent(event: Event) {
    eventService.publishEvent(event)
  }


  return (
    <div>
      { 
        events && events.map(
          (ev: Event) => <div key={ev._id} className='flex events-list'>
            <div className={ev.publish ? 'col-green': ''}>{ev.name}</div>
            <div className='event-actions'>
              <Link href={`/events/${ev._id}/edit`}>Edit</Link>
              <Link href={''} onClick={() => deleteEvent(ev)}>Delete</Link>
              {
                !ev.publish ?
                <Link href={''} onClick={() => publishEvent(ev)}>Publish</Link>
                : ''
              }
            </div>
          </div>
        )
        
      }
    </div>
  )
}

