import { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from "helpers/api_handler"
import Event from "models/event"

async function findById(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  const event = await Event.findById(id)

  res.status(200).json(event);
}

async function updateEvent() {

}


export default apiHandler({
  get: findById
})