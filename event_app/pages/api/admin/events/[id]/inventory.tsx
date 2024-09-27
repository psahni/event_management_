import { apiHandler } from "helpers/api_handler"
import { NextApiRequest, NextApiResponse } from 'next';
import Event from "models/event"

async function UpdateInventory(req: NextApiRequest, res: NextApiResponse) {
  const { count } = req.body;
  const { id }    = req.query;

  const event = await Event.findById(id);
  if (!event) {
    return res.status(404).json("Event not found");
  }
  const ticketsLeft = event.ticketsAvailable - count;

  const saved = await Event.updateOne({ _id: id }, { ticketsAvailable: ticketsLeft });

  if (!saved.acknowledged) return res.status(500).json("something went wrong");

  
  res.status(200).json({success: true, message: "Event has been updated"});
}

const handler = apiHandler({
  put: UpdateInventory,
});




export default handler;

