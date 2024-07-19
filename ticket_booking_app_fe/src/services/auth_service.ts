import axios, { HttpStatusCode } from "axios"
import Login from '../pages/Login';

const API_URL = "http://app.localhost:3000"

export interface SignUpForm {
   email: string 
   firstName: string
   lastName: string 
   password: string
}

export interface LoginForm {
  email: string
  password: string
}

const loggedIn = false;

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

async function Login(user: LoginForm) {
    const { email, password } = user;

    let response = await axios.post(`${API_URL}/api/user/login`, {
      email,
      password
    }, { withCredentials: true })

    if (response.status == HttpStatusCode.Ok) {
      return { status: HttpStatusCode.Ok }
    }

    return {
      status: response.status,
      data: {}
    }
}

let authService = {};
export default authService = {
  Login,
  SignUp,
  loggedIn
}

