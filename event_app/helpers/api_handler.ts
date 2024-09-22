import { NextApiRequest, NextApiResponse } from 'next';

const protectedAPIRoutes = ["/api/bookings"];
const adminAPIRoutes = ["/api/events"];

function apiHandler(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toLowerCase();
  
    const isProtectedRoute = protectedAPIRoutes.find(route => req.url?.match(`^${route}`));

    if (isProtectedRoute && !IsTokenPresent(req.headers.authorization)) {
      return res.status(401).end(JSON.stringify({ success: false, message: 'authentication failed' }))
    } else {
      const isAdminRoute = adminAPIRoutes.find(route => req.url?.match(`^${route}`));
      if (isAdminRoute) {
        // check for cookie session
        // I think we can do it directly in the middleware..may be
      }
    }
   
    
    if (!method || (method && !handler[method])) return res.status(405).end(res);

    try {
      await handler[method](req, res);
    } catch (err) {
      console.error(err)
    }
  }
}


function IsTokenPresent(token: string | undefined) {
  if (!token) {
    return false;
  }

  if (!token.startsWith('Bearer ')) {
    return false;
  }

  const authToken = token.split(' ')[1];
  console.log("auth token = ", authToken);

  return true;
}

export { apiHandler };