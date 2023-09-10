import React, { useContext, useEffect, useState,useRef } from "react";
import Message from "./Message";
import { AuthContext } from "../auth/context";
import { toast } from "react-hot-toast";

const ConversationBody = ({ displayConversation, socket,updateConversation}) => {
    const [message, setMessage] = useState("");
    const {getFBPageData} = useContext(AuthContext);
    const messagesEndRef = useRef();
    const [messagesDisplayed, setMessagesDisplayed] = useState(null);
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

      const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      };

    
      const submitData = async() => {
        console.log('Submitted:', message);
        socket.emit('sendMessage',{receiverId, text:message, pageData:fbPageData,convId:displayConversation?.conversationId})
        setMessage('');
      };

      useEffect(()=>{
        scrollToBottom();
      }, [messagesDisplayed]);

      useEffect(()=>{
        socket.on('latest_messages', (latest_messages) => {
            const res = JSON.parse(latest_messages);
            const response = res.response;
            if(response?.error?.message.length>0){
                toast.error(response?.error?.message);
            }
            if(response?.recipient_id?.length>0){
               updateConversation(res.messages,res.convId)
            }
          });
        return () => socket.off('latest_messages');
      },[socket])

      useEffect(()=>{
       setMessagesDisplayed(displayConversation?.messages);
      },[displayConversation])

    //   useEffect(()=>{
    //     socket.on('receive_message', (message) => {
    //         console.log('receive message', JSON.parse(message));
    //       });
    //     return () => socket.off('receive_message');
    //   },[socket])

    return (
        <React.Fragment>
            <div className="relative h-full overflow-y-auto">
                <div className=" border-b-2 border-b-gray-300 py-5 px-8 fixed bg-white w-[46.8%] z-10">
                    <h1 className="text-3xl font-bold ">{username}</h1>
                </div>
                <div className="w-full h-auto bg-[#f6f7f6] py-24">
                    {messagesDisplayed?.map((message, index) => {
                        return(
                            <Message key={index} message={message} participants={displayConversation?.participants}/>
                        )
                     })}
                </div>
                <div ref={messagesEndRef}></div>

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