import React, { useState } from "react";
import Conversations from "../Conversations/ConversationList";
import ConversationBody from "../Conversations/ConversationBody";
import UserDetails from "../UserDetails/UserDetails";


const Dashboard = () => {

   const [selectedConversation, setSelectedConversation] = useState(null);

    return (
        <section className="flex w-full h-full text-gray-800">
            <div className="flex flex-col w-1/4">
                <Conversations setSelectedConversation={setSelectedConversation} selectedConversation={selectedConversation}/>
            </div>

            <div className="flex flex-col w-1/2 border-x-2 border-gray-300">
              <ConversationBody/>
            </div>

            <div className="flex flex-col w-1/4">
             <UserDetails/>
            </div>
        </section>
    )
}

export default Dashboard;