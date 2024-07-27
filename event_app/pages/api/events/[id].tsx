import { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from "helpers/api_handler"
import Event from "models/event"

async function findById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  const event = await Event.findById(id)

  res.status(200).json(event);
}

async function updateEvent(req: NextApiRequest, res: NextApiResponse) {
  console.log("-----")
  console.log(req.body)
  const { id } = req.query
  delete req.body._id

  const event = await Event.findOne({ _id: id })
  if (event) {
    const saved = await Event.updateOne({ _id: id }, req.body)
    if (!saved.acknowledged) return res.status(500);
    return res.status(200).json(event)
  }

  return res.status(401)
}

async function deleteEvent(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  await Event.deleteOne({ _id: id })

  return res.status(200).json({ message: "Deleted Successfully" })
}

async function publishEvent(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  await Event.updateOne({ _id: id }, { publish: true })

  return res.status(200).json({ message: "Pubslished" })
}

export default apiHandler({
  get: findById,
  put: updateEvent,
  patch: publishEvent,
  delete: deleteEvent
})