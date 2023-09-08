/* eslint-disable */ 
import axios from "axios";
const http = axios.create({
  baseURL: 'https://localhost:8000/',
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

//   map(url = 'map') {
//       const config = {
//         headers: {
//           'authorization': 'Bearer ' + localStorage.getItem('token')
//         }
//       };

//       return {
//           fetchAll: () => http.get(url + '/list', config),
//           fetchById: id => http.get(url + "/" + id, config),
//           create: newRecord => http.post(url, newRecord, config),
//           update: (id, updatedRecord) => http.put(url + "/" + id, updatedRecord, config),
//           delete: id => http.delete(url + "/" + id, config)
//       }
//   },

  user(url = 'tasks/') {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('mypegtoken')
        }
      };

      return {
          fetchAll: () => http.get(url , config),
          fetchById: id => http.get(url + id, config),
          create: newRecord => http.post(url, newRecord, config),
          update: (id,updatedRecord) => http.patch(url+id, updatedRecord, config),
          delete: id => http.delete(url+id, config)
      }
  }

}