/* eslint-disable */ 
import axios from "axios";
import queryString from "query-string";

const stringifiedParams = queryString.stringify({
   client_id: process.env.FB_APP_ID,
   redirect_uri: "http://localhost:3000/fbIntegrate/",
    scope:["email","pages_messaging","pages_messaging_subscriptions","pages_messaging_phone_number"].join(","),
    response_type: 'code',
    display: 'popup',
});

const fbUrl = `https://www.facebook.com/v17.0/dialog/oauth?${stringifiedParams}`;

const http = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    "Content-type": "application/json",
  },
});

const fbApi = axios.create({
  baseURL: fbUrl,
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

  fb(url = '') {
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
   

}