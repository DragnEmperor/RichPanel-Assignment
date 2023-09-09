import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
    const { getAuthUser,login } = useContext(AuthContext);
    const navigate = useNavigate();
    const user = getAuthUser();
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const updateUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (user)
            navigate('/fbIntegrate');
    }, [user]);

    const submitHandler = (e) => {
     e.preventDefault();
     login(userData.email,userData.password,navigate,setIsLoading)
    }


    return (
        <React.Fragment>
            <div className="w-screen h-screen flex justify-center items-center bg-[#004c94]">
                <div className="bg-white p-12 rounded-3xl ">
                    <h6 className="text-2xl text-center font-semibold">Login to your account</h6>
                    <form onSubmit={submitHandler} className="flex flex-col gap-6 pt-8">
                        <div>
                            <label htmlFor="email" className="font-semibold text-base">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-96 border-2 border-gray-300 p-2 block rounded-md mt-1 tracking-wide text-base"
                                value={userData.email}
                                onChange={updateUserData}
                                autoComplete="off"
                            />
                        </div>
                        <div className="pb-8">
                            <label htmlFor="password" className="font-semibold text-base">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-96 border-2 border-gray-300 p-2 block rounded-md mt-1 tracking-wide text-base"
                                value={userData.password}
                                onChange={updateUserData}
                                autoComplete="off"
                            />
                        </div>
                        <button className="bg-[#004f97] p-4 w-full text-white text-xl rounded-md" type="submit">
                           Login
                        </button>
                        <p className="text-center font-medium pt-4"> New to MyApp? <Link to="/register" className="text-blue-800">Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;