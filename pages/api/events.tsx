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


async function createEvent(eventParams: EventParams) {
  console.log("event params = ", eventParams)
}

const handler = apiHandler({
  get: FindAll,
  post: createEvent
});


export default handler