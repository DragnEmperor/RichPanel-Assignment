import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { AuthContext } from "../auth/context";
import axios from "axios";
import { toast } from "react-hot-toast";
import env from "react-dotenv";

const ConversationBody = ({ displayConversation, reloadConversations}) => {
    const [message, setMessage] = useState("");
    const {getFBPageData} = useContext(AuthContext);
    const [reloadPage, setReloadPage] = useState(false);
    const fbPageData = getFBPageData();
    const receiverDetails = (displayConversation?.participants?.find((item)=>item.id!==displayConversation?.pageId));
    const username = receiverDetails?.name;
    const receiverId = receiverDetails?.id;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          submitData();
        }
      };

      const submitData = async() => {
        console.log('Submitted:', message);
        const response = await axios.post(env.BACKEND_URL+'facebook/sendMessage',{receiverId, text:message, pageData:fbPageData});
        if(response?.data?.data?.error?.message.length>0){
            toast.error(response?.data?.data?.error?.message);
        }
        if(response?.data?.data?.recipient_id?.length>0){
            toast.success('Message Sent! Please reload using reload button');
            reloadConversations(fbPageData?.id, fbPageData?.access_token);
        }
        setMessage('');
      };

      useEffect(() => {
        setReloadPage(!reloadPage);
      },[displayConversation])

    return (
        <React.Fragment>
            <div className="relative h-full overflow-y-auto ">
                <div className=" border-b-2 border-b-gray-300 py-5 px-8 fixed bg-white w-[46.8%] z-10">
                    <h1 className="text-3xl font-bold ">{username}</h1>
                </div>
                <div className="w-full h-auto bg-[#f6f7f6] py-24">
                    {displayConversation?.messages?.map((message, index) => {
                        return(
                            <Message key={index} message={message} participants={displayConversation?.participants}/>
                        )
                     })}
                </div>

                <div className={"px-4 absolute bottom-2 w-full " + (!!displayConversation ? "":" hidden")}>
                    <div className="fixed bottom-2 w-[46%]">
                        <input
                            type="text"
                            className="appearance-none p-4 w-full border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-2 focus:border-blue-300 text-lg"
                            placeholder={`Message ${username}`}
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ConversationBody;