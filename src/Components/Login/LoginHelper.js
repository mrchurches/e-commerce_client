import axios from "axios";
const {REACT_APP_URL} = process.env;
export async function postUsers({username, password}){
    var options = {
        method: 'POST',
        // url: REACT_APP_URL +`login`,
        url: 'http://localhost:3001/' +`login`,
        withCredentials: true,
        data: {username, password}
      };
    try {     
        const response = await axios.request(options)
        return response.data
    }catch(error){
        console.log(error);
    }
};