import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from "helpers/api_handler"
import * as authLib from "lib/auth"

export async function test(req: NextApiRequest, res: NextApiResponse) {
  await authLib.getSession(req)
  
  res.status(200).json("test api")
}



export default apiHandler({
  get: test
})