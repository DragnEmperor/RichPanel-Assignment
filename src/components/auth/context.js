import React, {createContext} from "react";
import API from "./api";

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
    
    login = (email, password, history, setIsLoading, setErrorMessage) => {
      setIsLoading(true);
      this.setLogin(null)
      // !! to convert to boolean: 0,null or undefined is false rest is true
      if (!!email && !!password) {
        API.auth().login({ email, password })
        .then(res=>{
          if(res.data.error)
            setErrorMessage(res.data.error)
          this.setLogin(res.data)
          history('/dashboard')
        })
        setIsLoading(false)
        setErrorMessage(null)
      } else {
        setIsLoading(false);
        setErrorMessage("email and password is empty")
        return false
      }
    }
    
    register = (email, name, password,secretCode, history, setIsLoading, setErrorMessage) => {
      setIsLoading(true);
    
      if (!!email && !!name && !!password) {
        console.log(email, name, password,secretCode);
        API.auth().register({ email, name, password,secretCode })
            .then(res => {
              console.log('signupres',res)
              localStorage.setItem('mypegtoken', res.data.token)
              localStorage.setItem('authpegUser', JSON.stringify(res.data.user))
              setErrorMessage(null)
              setIsLoading(false);
              history('/dashboard')
            })
            .catch(err => {
              console.log(err)
              setErrorMessage(err.message)
              setIsLoading(false);
            });
      } else {
        setErrorMessage("All field is required")
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
