import { apiHandler } from "helpers/api_handler"
import { NextApiRequest, NextApiResponse } from 'next';
import Event from "models/event"

async function UpdateInventory(req: NextApiRequest, res: NextApiResponse) {
  const { count } = req.body;
  const { id }    = req.query;

  const event = await Event.findOne({ _id: id });
  const ticketsLeft = event.ticketsAvailable - count;

  await Event.updateOne({ _id: id }, { ticketsAvailable: ticketsLeft });

  res.status(200).json({})
}

const handler = apiHandler({
  put: UpdateInventory,
});




export default handler;

