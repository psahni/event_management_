import axios, { HttpStatusCode } from "axios"

const API_URL = "http://localhost:3000"

export interface SignUpForm {
   email: string 
   firstName: string
   lastName: string 
   password: string
}

const loggedIn = false;

function Login() {

}

function Logout() {

}

async function SignUp(user: SignUpForm) {
  const { firstName , lastName, email, password } = user;
  let response = await axios.post(`${API_URL}/api/user/signup`, {
    first_name: firstName,
    last_name: lastName,
    email,
    password
  })
  if (response.status == HttpStatusCode.Accepted) {
    return { status: HttpStatusCode.Accepted, data: response.data }
  }

  return {
    status: response.status,
    data: {}
  }
}

let authService = {};

export default authService = {
  Login,
  Logout,
  SignUp,
  loggedIn
}

