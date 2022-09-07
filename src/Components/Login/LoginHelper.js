import axios from "axios";
const {REACT_APP_URL} = process.env;

export async function postUsers({username, password}){
    var options = {
        method: 'POST',
        url: `${REACT_APP_URL}login`,
        withCredentials: true,
        data: {username, password}
      };
    try {     
        const response = await axios.request(options)
        console.log(response.data)
        return response.data
    }catch(error){
        console.log(error);
    }
};
