import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const FBIntegrate = () => {
    const { getAuthUser } = useContext(AuthContext);
    const user = getAuthUser();
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });

    const updateUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const submitHandler = (e) => {

    }

    return (
        <React.Fragment>
            <div className="w-screen h-screen flex justify-center items-center bg-[#004c94]">
                <div className="bg-white p-12 rounded-3xl ">
                    {user?.fbIntegrate  ?
                        (
                            <div>
                                <h6 className="text-xl text-center font-semibold">Facebook Page Integration</h6>
                                <h6 className="text-xl text-center">Integrated Page : {user?.fbIntegratePage}</h6>
                                <div className="flex flex-col gap-6 pt-8">
                                  <form onSubmit={submitHandler}>
                                    <button className="bg-red-600 p-4 w-96 text-white text-lg rounded-md">
                                        Delete Integration
                                    </button>
                                </form>
                                <button className="bg-[#004f97] p-4 w-96 text-white text-lg rounded-md">
                                        Reply to Messages
                                    </button>
                                </div>
                            </div>
                        )
                     :
                    (<div>
                        <h6 className="text-xl text-center font-semibold">Facebook Page Integration</h6>
                        <form onSubmit={submitHandler} className="flex flex-col gap-6 pt-8">
                            <button className="bg-[#004f97] p-4 w-96 text-white text-lg rounded-md">
                                Connect Page
                            </button>
                        </form>
                    </div>)
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default FBIntegrate;