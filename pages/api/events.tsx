import Event from "models/event"

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const events = await Event.find({})

  res.status(200).json(events);
}