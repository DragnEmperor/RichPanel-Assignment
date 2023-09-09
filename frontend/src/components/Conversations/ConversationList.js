import React, { useContext, useState } from "react";
import { AiOutlineAlignLeft, AiOutlineReload } from 'react-icons/ai';
import { AuthContext } from "../auth/context";
import axios from "axios";
import env from "react-dotenv";
import { backend_url } from "../auth/api";

function calculateTimePassed(iso8601Timestamp) {
    const timestampDate = new Date(iso8601Timestamp);
    const currentDate = new Date();
    const timeDifferenceMs = currentDate - timestampDate;
    const minutesPassed = Math.floor(timeDifferenceMs / (1000 * 60));
    if (minutesPassed >= 60) {
      const hours = Math.floor(minutesPassed / 60);
      return `${hours}h`;
    } else {
      return `${minutesPassed}m`;
    }
  }

const ConversationList = ({ selectedConversation, setSelectedConversation, pageConversations,reloadConversations }) => {

    const {  getFBPageData} = useContext(AuthContext);
    const fbPageData = getFBPageData();

    pageConversations?.forEach((conversation) => {
        conversation?.messages?.sort((a, b) => {
            const timeA = new Date(a.created_time).getTime();
            const timeB = new Date(b.created_time).getTime();
            return timeA - timeB;
        });
    });

    const handleReload = async() => {
        const response = await axios.post(backend_url+'facebook/reloadConversations',{fbPageData})
        if(response.data.status)
        reloadConversations(fbPageData?.id, fbPageData?.access_token);
    }

    return (<React.Fragment>
        <div className="flex items-center justify-between border-b-2 border-b-gray-300 py-5 px-8">
            <div className="flex gap-6 items-center">
                <AiOutlineAlignLeft className="w-6 h-6" />
                <h1 className="text-3xl font-bold ">Conversations</h1>
            </div>
            <AiOutlineReload onClick={handleReload} className="w-6 h-6 cursor-pointer" />
        </div>
        {pageConversations.map((conversation, index) => {

            const timePassed = calculateTimePassed(conversation?.messages?.[0]?.created_time);
            const username = (conversation?.participants?.find((item)=>item.id!==conversation?.pageId))?.name;

            return(
            <div key={index} className={`flex flex-col px-8 gap-4 py-4 hover:bg-gray-100 cursor-pointer text-black ${selectedConversation === index ? " bg-gray-100" : " "}`} onClick={() => setSelectedConversation(index)}>
                <div className="flex justify-between ">
                    <div className="flex items-center gap-6">
                        <input
                            type="checkbox"
                            id="conversation"
                            name="conversation"
                            className=" w-5 h-5 !border-2 border-gray-400 shadow rounded checked:bg-blue-800 checked:border-0"
                        />
                        <div>
                            <p className="text-lg font-semibold">{username}</p>
                            <p className="text-[0.95rem] font-semibold">{conversation.type==='page'?'Facebook Post':"Facebook DM"}</p>
                        </div>
                    </div>
                    <p className="text-base text-gray-600 font-semibold">{timePassed}</p>
                </div>
                <div>
                    {/* <p className="text-base font-semibold">{timePassed}</p> */}
                    <p className="text-base text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">{conversation?.messages?.[conversation.messages.length-1].message}</p>
                </div>
            </div>
       )})}
    </React.Fragment>
    )
}

export default ConversationList;