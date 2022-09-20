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

  username:function (username) {
    return /(^[\W\w][^\s@]{4,20}$)/.test(username)
  },

  email: function (email) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  },

  password: function (password) {
    return /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/.test(password)
  }
};

export async function existsUsername(username) {
  try {
    const users = await axios.get(`${REACT_APP_URL}user/find/username/${username}`);
      return users.data.user
  } catch (error) {
    console.log(error)
  }
};

export async function findEmail(email) {
  const response = await axios.get(`${REACT_APP_URL}user/find/email/${email}`);
  return response.data.user
};


export async function editUser({ id, name, lastname, username, email, password, profile_pic }) {
  console.log("🚀 ~ file: UserProfileHelper.js ~ line 60 ~ createNewUser ~ profile_pic", profile_pic)
  try {
     const token = window.sessionStorage.getItem('token');
    await axios.put(REACT_APP_URL+`user/editprofile?tkn=${token}`,{
    // await axios.put(REACT_APP_URL+`user/editprofile`,{
      id: id,
      name: name,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      profile_pic: profile_pic
    })
  } catch (error) {
    console.log(error.message)
    return 'Cannot be created'
  }
}
