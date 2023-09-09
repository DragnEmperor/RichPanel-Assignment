import React, { useState } from "react";
import Conversations from "../Conversations/ConversationList";
import ConversationBody from "../Conversations/ConversationBody";
import UserDetails from "../UserDetails/UserDetails";


const Dashboard = ({pageConversations}) => {

   const [selectedConversation, setSelectedConversation] = useState(null);
   const [displayConversation, setDisplayConversation] = useState(null);

   const conversationHandler = (index) => {
    setSelectedConversation(index);
    setDisplayConversation(pageConversations[index]);
   }

   const newPageConversations = pageConversations.map((conversation,index)=>({
    ...conversation,
    type:'dm'
   }))

    return (
        <section className="flex w-full h-full text-gray-800">
            <div className="flex flex-col w-1/4">
                <Conversations pageConversations={newPageConversations} setSelectedConversation={conversationHandler} selectedConversation={selectedConversation}/>
            </div>

            <div className="flex flex-col w-1/2 border-x-2 border-gray-300">
              <ConversationBody displayConversation={displayConversation}/>
            </div>

            <div className="flex flex-col w-1/4">
             <UserDetails/>
            </div>
        </section>
    )
}

export default Dashboard;