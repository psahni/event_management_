import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from "helpers/api_handler"
import bookingService from 'services/booking.service';

async function create(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, event_id, tickets } = req.body;
  console.log( { user_id, event_id, tickets });
  bookingService.CreateBooking({ user_id, event_id, tickets })
  return res.json("create...")
}



export default apiHandler({
  post: create
})
