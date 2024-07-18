import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from "helpers/api_handler"
import User from "models/user"
import bcrypt from "bcryptjs"

async function loginUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  try {
  const user = await User.findOne({ email }).exec()
    if (user._id) {
      bcrypt.compare(password, user.password, (error, isMatch) => {
        console.error(error)
        if (isMatch) {
          res.status(200).json({message: "loggedin successfully"})
        } else {
          res.status(401).json({message:"Either user name or password is incorrect", status: 401})  
        }
      })
    } else {
      res.status(401).json({message: "Either user name or password is incorrect", status: 401})
    } 
  } catch (e) {
    res.status(500).json({})
  }
}

export default apiHandler({
  post: loginUser
})
