// PUBLIC API - AUTHENTICATION REQURIED
const bookingServerUrl = process.env.BOOKING_SERVER_URL;

async function CreateBooking({ user_id, event_id, tickets }: { user_id: string, event_id: string, tickets: number}) {
  console.log("CreateBooking")
  let response = await fetch(`${bookingServerUrl}/create_booking`, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ user_id, event_id, tickets })
  });

  response = await response.json();

  console.log(response)

  return response
}


const bookingService = {
  CreateBooking
}

export default bookingService;
