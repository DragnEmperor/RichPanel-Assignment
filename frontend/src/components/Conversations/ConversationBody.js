import React, { useState } from "react";
import Message from "./Message";

const ConversationBody = ({ displayConversation }) => {

    const username = (displayConversation?.participants?.find((item)=>item.id!==displayConversation?.pageId))?.name;

    return (
        <React.Fragment>
            <div className="relative h-full overflow-y-auto ">
                <div className=" border-b-2 border-b-gray-300 py-5 px-8 fixed bg-white w-[46.8%] z-10">
                    <h1 className="text-3xl font-bold ">{username}</h1>
                </div>
                <div className="w-full h-auto bg-[#f6f7f6] py-24">
                    {displayConversation?.messages?.map((message, index) => {
                        return(
                            <Message key={index} message={message}/>
                        )
                     })}
                </div>

                <div className="px-4 absolute bottom-2 w-full">
                    <div className="fixed bottom-2 w-[46%]">
                        <input
                            type="text"
                            className="appearance-none p-4 w-full border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-2 focus:border-blue-300 text-lg"
                            placeholder={`Message ${username}`}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ConversationBody;