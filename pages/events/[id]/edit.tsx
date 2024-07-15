import React from 'react'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Edit from  "components/events/edit"
import eventService  from "services/event.service"

export default function EditPage() {
  const router = useRouter()
  const [event, setEvent] = useState({name: ''})

  async function findEvent() {
    const { id } = router.query
    if (!id) return;

    const event = await eventService.findEvent(id)
    setEvent(event)
  }

  useEffect(() => {
    findEvent()
  }, [router])

  return (
    <div>
      <h1>Edit Event</h1>
      <Edit event={event}/>
    </div>
  )
}