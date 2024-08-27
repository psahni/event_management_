import Event from "models/event"
import { apiHandler } from "helpers/api_handler"
import { NextApiRequest, NextApiResponse } from 'next';

async function FindAll(req: NextApiRequest, res: NextApiResponse) {
  // { publish: true, startDateTime: { $gte: new Date() } }
  const events = await Event.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })

  res.status(200).json(events);
}

const handler = apiHandler({
  get: FindAll,
});


export default handler