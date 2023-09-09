/* eslint-disable */ 
import axios from "axios";
import queryString from "query-string";



const http = axios.create({
  baseURL: 'https://localhost:5000/',
  headers: {
    "Content-type": "application/json",
  },
});


export default {
  auth(url = 'users') {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('mypegtoken')
      }
    };
    return {
        login: ({email, password}) => {
          return http.post(url + '/login/', {email, password})
        },
        register: ({email, name, password,secretCode}) => http.post(url + '/signUp/', {email, name, password,secretCode}),
        logout: () => http.post(url + '/logout',config),
    }
  },

  fbLogin(url = '') {
    return {
        getCompleteData: ({code}) =>{
          return http.post('/facebook/getCompleteData',{code})
        },
        getUserId: ({accessToken}) =>{
          return http.post('/facebook/getuserId',{accessToken})
        },
        logout: () => http.post(url + '/logout',config),
    }
  },
   

}