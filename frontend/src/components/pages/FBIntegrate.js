import React, { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context";
import { useNavigate } from "react-router";
import queryString from "query-string";
import { Link } from "react-router-dom";
import API from "../auth/api";

const FBIntegrate = () => {
    const { getAuthUser, getFBData, getFBToken, removeFBData } = useContext(AuthContext);
    const user = getAuthUser();
    const navigate = useNavigate();
    const [accessCode, setAccessCode] = React.useState('');
    const [accessToken, setAccessToken] = React.useState('');
    console.log('testingintegrate', user)
    // const [url,setUrl] = React.useState('');

    const fbToken = getFBToken();

    const deleteIntegration = (e) => {
            setAccessToken('');
            removeFBData(navigate);
    }

    const fetchUserID=()=>{
       
    }

    useEffect(()=>{
        if(!!fbToken)
           setAccessToken(fbToken)
    },[fbToken])

    useEffect(()=>{
        if(accessCode.length>5)
        getFBData(accessCode,navigate)
    },[accessCode])

    useEffect(() => {
        if (window.location.search) {
            const urlParams = queryString.parse(window.location.search);
            console.log(`The code is: ${urlParams.code}`);
            setAccessCode(urlParams.code)
        }
    }, []);

    return (
        <React.Fragment>
            <div className="w-screen h-screen flex justify-center items-center bg-[#004c94]">
                <div className="bg-white p-12 rounded-3xl ">
                    {(!!accessToken && accessToken?.length>1) ?
                        (
                            <div>
                                <h6 className="text-xl text-center font-semibold">Facebook Page Integration</h6>
                                <h6 className="text-xl text-center">Integrated Page : {user?.fbIntegratePage}</h6>
                                <div className="flex flex-col gap-6 pt-8">
                                    <button className="bg-red-600 p-4 w-96 text-white text-lg rounded-md" onClick={deleteIntegration}>
                                        Delete Integration
                                    </button>
                                    <button className="bg-[#004f97] p-4 w-96 text-white text-lg rounded-md" onClick={() => fetchUserID()}>
                                        Reply to Messages
                                    </button>
                                </div>
                            </div>
                        )
                        :
                        (<div className="flex flex-col gap-4">
                            <h6 className="text-xl text-center font-semibold">Facebook Page Integration</h6>
                            <Link to={'https://localhost:5000/facebook/login'} className="bg-[#004f97] p-4 w-96 text-white text-center text-lg rounded-md">
                                Connect Page
                            </Link>
                        </div>)
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default FBIntegrate;