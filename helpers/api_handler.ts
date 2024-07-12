import { NextApiRequest, NextApiResponse } from 'next';

// #Todo
function apiHandler(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method?.toLowerCase();

    if (!method || (method && !handler[method]))
      return res.status(405).end(`Method ${req.method} Not Allowed`);


    try {
      await handler[method](req, res);
    } catch (err) {
      console.error(err)
    }
  }
}

export { apiHandler };