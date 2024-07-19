import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from "helpers/api_handler"
import User from "models/user"
import bcrypt from "bcryptjs"
import * as authLib from 'lib/auth'

async function loginUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  let error =  null;
  let isMatch = false;
  let httpStatus = 401; 
  let message = "Either user name or password is incorrect"

  const user = await User.findOne({ email }).exec()

  if (user?._id) {
    isMatch = bcrypt.compareSync(password, user.password)
  }
  
  if (isMatch) {
    httpStatus = 200
    message = "loggedin successfully"
  }

  if (error) {
    console.error(error)
  }

  if (isMatch) {
    const cookie = await authLib.setCookie(user);
    console.log(cookie)
    res.setHeader('Set-Cookie', cookie)
  }

  res.status(httpStatus).json({ message })
}


export default apiHandler({
  post: loginUser
})
