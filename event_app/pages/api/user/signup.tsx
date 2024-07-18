import { NextApiRequest, NextApiResponse } from 'next';

import { apiHandler } from "helpers/api_handler"
import User from "models/user"

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { first_name: firstName, last_name: lastName, email, password } = req.body
  const newUser = new User({ firstName, lastName, email, password })
  try {
    const saved = await newUser.save()
    res.status(200).json({id: saved._id, first_name: saved.firstName, lastName: saved.lastName })
  } catch(e)  {
    console.log(e)
    res.status(500).send(e);
  }
}


export default apiHandler({
  post: createUser
})