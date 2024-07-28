import { useParams } from 'react-router-dom'
import eventService from '@services/events.service';
import { useEffect, useState } from 'react';
import { Event } from "@types/event"
 
const EventShow = () => {
  const { id } = useParams()
  const [event, setEvent] = useState({name: ''} as Event)
  
  const fetchEvent = async () => {
    const event: Event =  await eventService.fetchEventById(id)
    setEvent(event)
  }

  useEffect(() => {
    fetchEvent()
  }, [])

  return (
    <div>
      <h3>Showing Event</h3>
      <div className='event-show'>
        <div>{ event.name }</div>
        <div>{ event.description }</div>
        <button className='book'>Book</button>
      </div>
    </div>
  )
}

export {
  EventShow
}