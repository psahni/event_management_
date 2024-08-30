import { useParams } from 'react-router-dom'
import { eventsService } from '@services/events.service'
import { useEffect, useState } from 'react'
import { Event } from "@types/event"
import { useCounter } from "@hooks/useCounter"

const EventShow = () => {
  const { id } = useParams()
  const [event, setEvent] = useState({name: ''} as Event)
  const { count, increment, decrement, reset } = useCounter(1)

  const maxTickets = 5

  const fetchEvent = async () => {
    if (id) {
      const event: Event =  await eventsService.fetchEventById(id)
      setEvent(event)
    }
  }

  const setTickets = (operation: string) => {
    if (operation == "decrement") {
      if (count > 1) {
        decrement()
      }
      return
    }

    if (operation == "increment") {
      if (count < maxTickets) {
        increment()
      }
    }
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
        <div>
          <strong>Tickets left:</strong> 5
        </div>
        <div>
          <div>You can book maximum 5 tickets</div>
          <div className="booking-window"> 
            <button onClick={() => setTickets("decrement")}>-</button>
              {count}
            <button onClick={() => setTickets("increment")}>+</button>
          </div>
        </div>
        <button className='book'>Book</button>
      </div>
    </div>
  )
}

export {
  EventShow
}