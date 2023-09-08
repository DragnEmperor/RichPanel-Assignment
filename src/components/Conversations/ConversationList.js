import React, { useState } from "react";
import { AiOutlineAlignLeft, AiOutlineReload } from 'react-icons/ai';

const dummyConversations = [
    {
        name: "Aman",
        platform: "Facebook DM",
        msgHead: "Hey, I have a question",
        msgBody: "I have a question about my order. Can you help me? Hallsdakod hjhdfhaw hjaihdoahdfao ndhadhoaafaa da wda da a adf ad a ad a",
        timeAgo: "2m",
    },
    {
        name: "Parth",
        platform: "Facebook Page",
        msgHead: "Are you there?",
        msgBody: "Haallooooo!!! My selffff Parth kaushik from Chandigarh.Hfafnahfdahfiabuirh ai iahfiuqahfillsdakod hjhdfhaw hjaihdoahdfao ndhadhoaafaa da wda da a adf ad a ad a",
        timeAgo: "10m",
    },
];

const ConversationList = () => {

    const sortedConversationsDescending = dummyConversations.sort((a, b) => {
        const timeA = parseInt(a.timeAgo);
        const timeB = parseInt(b.timeAgo);

        return timeB - timeA;
    });

    const handleReload = () => {

    }

    return (<React.Fragment>

        <div className="flex items-center justify-between border-b-2 border-b-gray-300 py-6 px-8">
            <div className="flex gap-6 items-center">
                <AiOutlineAlignLeft className="w-6 h-6" />
                <h1 className="text-3xl font-bold ">Conversations</h1>
            </div>
            <AiOutlineReload onClick={handleReload} className="w-6 h-6" />
        </div>
        {sortedConversationsDescending.map((conversation, index) => (
            <div className="flex flex-col px-8 gap-4 py-4 hover:bg-gray-100 cursor-pointer text-black">
                <div className="flex justify-between ">
                    <div className="flex items-center gap-6">
                        <input
                            type="checkbox"
                            id="conversation"
                            name="conversation"
                            className="appearance-none w-5 h-5 border-2 border-gray-400 shadow rounded"
                        />
                        <div>
                            <p className="text-lg font-semibold">{conversation.name}</p>
                            <p className="text-[0.95rem] font-semibold">{conversation.platform}</p>
                        </div>
                    </div>
                    <p className="text-base text-gray-600 font-semibold">{conversation.timeAgo}</p>
                </div>
                <div>
                    <p className="text-base font-semibold">{conversation.msgHead}</p>
                    <p className="text-base text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">{conversation.msgBody}</p>
                </div>
            </div>
        ))}
    </React.Fragment>
    )
}

export default ConversationList;