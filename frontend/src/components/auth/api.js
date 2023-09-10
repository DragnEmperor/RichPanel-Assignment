/* eslint-disable */ 
import axios from "axios";

export const backend_url = "https://fb-backend-assign.onrender.com/";
const http = axios.create({
  baseURL: backend_url,
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
        getConversations : ({pageId,accessToken}) =>{
          return http.post('/facebook/getConversations',{pageId,accessToken})
        },
        getUserId: ({accessToken}) =>{
          return http.post('/facebook/getuserId',{accessToken})
        },
        logout: () => http.post(url + '/logout',config),
    }
  },
   

}