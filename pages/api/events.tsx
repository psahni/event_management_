import Event from "models/event"
import { apiHandler } from "helpers/api_handler"
import { NextApiRequest, NextApiResponse } from 'next';

interface EventParams {
  name: string,
  description?: string,
  startDateTime: Date,
  startEndTime: Date, 
}

async function FindAll(req: NextApiRequest, res: NextApiResponse) {
  const events = await Event.find({})

  res.status(200).json(events);
}


async function createEvent(req: NextApiRequest, res: NextApiResponse) {
  const {name, description, startDateTime, endDateTime } = req.body
  const newevent = new Event({name, description, startDateTime, endDateTime })
  try {
    const saved = await newevent.save()
    res.status(200).json(saved)
  } catch(e)  {
    console.log(e)
    res.status(500).send(e);
  }
  
}

const handler = apiHandler({
  get: FindAll,
  post: createEvent
});


export default handler