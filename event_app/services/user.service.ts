interface newUserForm {
  firstName: string
  lastName: string
  email: string
  password: string
}

function createUser(newUser: newUserForm) {
  console.log("newUser ", newUser)
  
}

const userService = {
  createUser
} 

export default userService;