import React, {createContext} from "react";
import API from "./api";
import {toast} from 'react-hot-toast';

let AuthContext;
const { Provider, Consumer } = (AuthContext = createContext());

class AuthProvider extends React.PureComponent {
    state = {
        token : null,
        authUser: null,
        errorMsg : null
    };

    isAuthenticated = () => {
      const token = this.state.token || localStorage.getItem('mypegtoken');
      if (token && token != 'undefined') {
        return true;
      }
      return false;
    }

    getAuthUser = () => {
      const usr = this.state.authUser ? this.state.authUser : localStorage.getItem("authpegUser")
      if (!usr) return null

      try {
        const parsed = JSON.parse(usr)
        return parsed
      }
      catch(err) {
        return usr
      }
    }

    setLogin = (data) => {
      if (data) {
        localStorage.setItem('mypegtoken', data.token)
        localStorage.setItem('authpegUser', JSON.stringify(data.user))
        this.setState({
          token : data.token,
          authUser: data.user
        })
      }
      else {
        this.setState({
          token : null,
          authUser: null
        })
        localStorage.removeItem("mypegtoken");
        localStorage.removeItem("authpegUser");
      }
    }
    
    login = (email, password, history, setIsLoading,setToastMessage) => {
      setIsLoading(true);
      this.setLogin(null);
      // !! to convert to boolean: 0,null or undefined is false rest is true
      if (!!email && !!password) {
        API.auth().login({ email, password })
        .then(res=>{
          if(!res.data.status){
            console.log('error',res)
            toast.error(res.data.message)
          }
          else {
            this.setLogin(res.data)
            history('/fbIntegrate')
          }
        })
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error("email and password is empty")
        return false
      }
    }
    
    register = (email, name, password, history, setIsLoading) => {
      setIsLoading(true);
    
      if (!!email && !!name && !!password) {
        API.auth().register({ email, name, password })
            .then(res => {
              console.log('signupres',res)
              if(!res.data.status){
                toast.error(res.data.message)
                return;
              }
              localStorage.setItem('mypegtoken', res.data.token)
              localStorage.setItem('authpegUser', JSON.stringify(res.data.user))
              setIsLoading(false);
              history('/fbIntegrate')
            })
            .catch(err => {
              toast.error(err.response.data.message)
              setIsLoading(false);
            });
      } else {
        toast.error("All field is required");
        setIsLoading(false);
      }
    }

    logout = (history) => {
      console.log('logout called')
      this.setState({ 
        token : null,
        authUser: null
      });
      localStorage.removeItem("mypegtoken");
      localStorage.removeItem("authpegUser");
      API.auth().logout()
      history("/login");
    }

    fbLogin = (history)=>{
      console.log('fbcalled');
      
    }

    render() {
      return (
        <Provider
          value={{
              ...this.state,
              login : this.login,
              register : this.register,
              logout : this.logout,
              isAuthenticated : this.isAuthenticated,
              getAuthUser : this.getAuthUser
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}

export { AuthProvider, Consumer, AuthContext };
