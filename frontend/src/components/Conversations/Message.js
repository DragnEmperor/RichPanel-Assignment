import { useContext } from "react";
import { AuthContext } from "../auth/context";

const Message = ({ message }) => {
    const { getAuthUser } = useContext(AuthContext);
    const currentUser = getAuthUser();

    console.log(message)
    return (
        <div className={` w-fit ${false ? " ml-auto mr-6" : "ml-6 "}`}>
            <div className={`flex gap-2 ${false ? " flex-row-reverse " : ""}`}>
                <div className="relative top-2">
                    <img src="https://images.unsplash.com/photo-1693693928634-658db91ca093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" alt="user-icon" className="w-10 h-10 object-cover rounded-full" />
                </div>
                <div>
                    <div className="bg-white p-4 border-2 rounded-lg">
                    <p className="text-lg font-semibold">hello How are you</p>
                    </div>
                    <p className="pt-1">
                        <span className="font-semibold">Aman</span> - March 12 5:05 PM
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Message;