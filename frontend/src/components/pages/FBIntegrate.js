import React, { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context";
import { useNavigate } from "react-router";
import queryString from "query-string";
import { Link } from "react-router-dom";
import env from "react-dotenv";
import { backend_url } from "../auth/api";

const FBIntegrate = () => {
    const { getAuthUser, getFBData, getFBToken, removeFBData,getFBPageData } = useContext(AuthContext);
    const user = getAuthUser();
    const navigate = useNavigate();
    // const [accessToken, setAccessToken] = React.useState('');
    // const [url,setUrl] = React.useState('');
    
    // const fbToken = getFBToken();
    const fbPageData = getFBPageData();

    const deleteIntegration = (e) => {
            // setAccessToken('');
            removeFBData(navigate);
    }

    useEffect(() => {
        if (window.location.search) {
            const urlParams = queryString.parse(window.location.search);
            // console.log(`The code is: ${urlParams.code}`);
            if(urlParams.code.length>5)
            getFBData(urlParams.code,navigate)
        }
    }, []);

    return (
        <React.Fragment>
            <div className="w-screen h-screen flex justify-center items-center bg-[#004c94]">
                <div className="bg-white p-12 rounded-3xl ">
                    {(!!fbPageData && fbPageData?.name.length>1) ?
                        (
                            <div>
                                <h6 className="text-xl text-center font-semibold">Facebook Page Integration</h6>
                                <h6 className="text-xl text-center">Integrated Page : {fbPageData?.name}</h6>
                                <div className="flex flex-col gap-6 pt-8">
                                    <button className="bg-red-600 p-4 w-96 text-white text-lg rounded-md" onClick={deleteIntegration}>
                                        Delete Integration
                                    </button>
                                    <Link to="/dashboard" className="bg-[#004f97] p-4 w-96 text-center text-white text-lg rounded-md">
                                        Reply to Messages
                                    </Link>
                                </div>
                            </div>
                        )
                        :
                        (<div className="flex flex-col gap-4">
                            <h6 className="text-xl text-center font-semibold">Facebook Page Integration</h6>
                            <Link to={backend_url+'facebook/login'} className="bg-[#004f97] p-4 w-96 text-white text-center text-lg rounded-md">
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