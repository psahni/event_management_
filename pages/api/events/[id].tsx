import { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from "helpers/api_handler"
import Event from "models/event"

async function findById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  const event = await Event.findById(id)

  res.status(200).json(event);
}

async function updateEvent(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  let event = await Event.findById(id)
  event = Object.assign(event, req.body)

  const saved = await Event.updateOne(event)

  if (!saved.acknowledged) return res.status(500);

  return res.status(200).json(event)
}

export default apiHandler({
  get: findById,
  put: updateEvent
})