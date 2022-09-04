import axios from 'axios';

export const { REACT_APP_URL } = process.env

export const userFormat = {
  name: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  cPassword: ""
};
export const validatedFormat = {
  name: false,
  lastname: false,
  username: false,
  email: false,
  password: false
}

export const validatedFunctions = {
  name: function (name) {
    return /(^[a-zA-Z]{0,20}$)/.test(name)
  },

  lastname: function (lastname) {
    return /(^[a-zA-Z]{0,20}$)/.test(lastname);
  },

  username: {
    existsUsername: function (usernames, username) {
      if (!usernames.includes(username)) return true
      return false
    },
    validateUsername: function (username) {
        return /(^[\W\w][^\s@]{4,20}$)/.test(username)
    }
  },

  email: function (email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  },

  password: function (password) {
    return /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/.test(password)
  }
};

export async function getUsers() {
  const users = await axios.get(`${REACT_APP_URL}/users/all`);
  return users.data.map(e => e.username)
};

export async function findEmail(email) {
  const response = await axios.get(`${REACT_APP_URL}/user/find/${email}`);
  return response.data.user
};

export async function createNewUser({ name, lastname, username, email, password, profile_pic }) {
  try {
    const response = await axios.post(`${REACT_APP_URL}/signin`, {
      name,
      lastname,
      username,
      email,
      password,
      profile_pic
    })
    console.log(response.data)
  } catch (error) {
    console.log(error.message)
    return 'Cannot be created'
  }
}