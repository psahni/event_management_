import { useEffect, useState } from 'react';
import Link from 'next/link';

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
      { 
        events && events.map(
          (ev: Event) => <div key={ev._id} className='flex events-list'>
            <div>{ev.name}</div>
            <div className='event-actions'>
              <Link href={`/events/${ev._id}/edit`}>Edit</Link>
            </div>
          </div>
        )
        
      }
    </div>
  )
}

