import React, { useState } from "react";
import { AiOutlineAlignLeft, AiOutlineReload } from 'react-icons/ai';
import Message from "./Message";

const senderMsgs = [
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

const ConversationBody = ({ user }) => {

    return (
        <React.Fragment>
            <div className="relative h-full overflow-y-auto ">
                <div className=" border-b-2 border-b-gray-300 py-5 px-8 fixed bg-white w-[46.8%] z-10">
                    <h1 className="text-3xl font-bold ">HAlo</h1>
                </div>
                <div className="w-full h-auto bg-[#f6f7f6] py-24">
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                </div>

                <div className="px-4 absolute bottom-2 w-full">
                    <div className="fixed bottom-2 w-[46%]">
                        <input
                            type="text"
                            className="appearance-none p-4 w-full border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-2 focus:border-blue-300 text-lg"
                            placeholder={`Message ${user?.name}`}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ConversationBody;